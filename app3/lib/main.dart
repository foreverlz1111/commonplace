import 'dart:developer';
import 'package:flutter/material.dart';
import 'dart:io';
import 'package:flutter/services.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/cupertino.dart';

String _name = "汤姆";
void main() {
  runApp(ChatApp());
  if (Platform.isAndroid) {
    SystemUiOverlayStyle systemUiOverlayStyle =
        const SystemUiOverlayStyle(statusBarColor: Colors.transparent);
    SystemChrome.setSystemUIOverlayStyle(systemUiOverlayStyle);
  }
  // final ThemeData kIOSTheme = ThemeData(
  //   primarySwatch: Colors.orange,
  //   primaryColor: Colors.grey[100],
  // );
}

class ChatApp extends StatelessWidget {
  ChatApp({
    Key? key,
  }) : super(key: key);
  final ThemeData kDefaultTheme = ThemeData(
      colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.purple)
          .copyWith(secondary: Colors.orangeAccent[400]));
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "ChatUI",
      theme: defaultTargetPlatform == TargetPlatform.android
          ? kDefaultTheme
          : kDefaultTheme,
      home: const ChatScreen(),
    );
  }
}

class ChatScreen extends StatefulWidget {
  const ChatScreen({
    Key? key,
  }) : super(key: key);

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> with TickerProviderStateMixin {
  final List<ChatMessage> _message = [];
  final _textController = TextEditingController();
  final FocusNode _focusNode = FocusNode();
  bool _isComposing = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("聊天"),
        elevation: Theme.of(context).platform == TargetPlatform.android ? 4 : 0,
      ),
      body: Container(
          child: Column(
            children: [
              Flexible(
                child: ListView.builder(
                  reverse: true,
                  padding: const EdgeInsets.all(8),
                  itemBuilder: (_, index) => _message[index],
                  itemCount: _message.length,
                ),
              ),
              const Divider(
                height: 1,
              ),
              Container(
                decoration: BoxDecoration(
                  color: Theme.of(context).cardColor,
                ),
                child: _buildTextComposer(),
              ),
            ],
          ),
          decoration: Theme.of(context).platform == TargetPlatform.android
              ? BoxDecoration(
                  border: Border(top: BorderSide(color: Colors.grey[200]!)))
              : null),
    );
  }

  Widget _buildTextComposer() {
    return IconTheme(
        data: IconThemeData(color: Theme.of(context).colorScheme.background),
        child: Container(
          color: Colors.black12,
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
          margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 15),
          child: Row(
            children: [
              Flexible(
                child: TextField(
                  controller: _textController,
                  onChanged: (text) {
                    setState(() {
                      _isComposing = text.isNotEmpty;
                    });
                  },
                  onSubmitted: _isComposing ? _handleSubmitted : null,
                  decoration: const InputDecoration.collapsed(hintText: "点击输入"),
                  focusNode: _focusNode,
                ),
              ),
              Container(
                margin: EdgeInsets.symmetric(horizontal: 4.0),
                child: Theme.of(context).platform == TargetPlatform.android
                    ? // MODIFIED
                    CupertinoButton(
                        // NEW
                        child: const Text('发送'), // NEW
                        onPressed: _isComposing // NEW
                            ? () =>
                                _handleSubmitted(_textController.text) // NEW
                            : null,
                      )
                    : IconButton(
                        icon: _isComposing
                            ? const Icon(Icons.send_rounded)
                            : const Icon(Icons.send),
                        onPressed: _isComposing
                            ? () => _handleSubmitted(_textController.text)
                            : null,
                      ),
              ),
            ],
          ),
        ));
  }

  _handleSubmitted(String text) {
    _textController.clear();
    var message = ChatMessage(
      text: text,
      animationController: AnimationController(
        duration: const Duration(milliseconds: 400),
        vsync: this,
      ),
    );
    setState(() {
      _isComposing = false;
      _message.insert(0, message);
    });
    _focusNode.requestFocus();
    message.animationController.forward(); // ?
    log(_message.toString());
  }

  @override
  void dispose() {
    for (var message in _message) {
      message.animationController.dispose();
    }
    super.dispose();
  }
}

class ChatMessage extends StatelessWidget {
  const ChatMessage(
      {Key? key, required this.text, required this.animationController})
      : super(key: key);
  final String text;
  final AnimationController animationController;

  @override
  Widget build(BuildContext context) {
    return SizeTransition(
      sizeFactor:
          CurvedAnimation(parent: animationController, curve: Curves.easeOut),
      axisAlignment: 0,
      child: Container(
          margin: const EdgeInsets.all(10),
          child: Row(
            children: [
              Container(
                margin: const EdgeInsets.only(right: 16),
                child: const CircleAvatar(
                  child: Icon(Icons.account_circle_rounded),
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(_name, style: Theme.of(context).textTheme.headline4),
                    Container(
                      margin: const EdgeInsets.only(top: 5),
                      child: Text(text),
                    )
                  ],
                ),
              )
            ],
          )),
    );
  }
}
