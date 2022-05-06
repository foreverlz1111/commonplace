import 'dart:developer';

import 'package:flutter/material.dart';

String _name = "汤姆";
void main() {
  runApp(const ChatApp());
}

class ChatApp extends StatelessWidget {
  const ChatApp({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: "ChatUI",
      home: ChatScreen(),
    );
  }
}

class ChatMessage extends StatelessWidget {
  const ChatMessage({Key? key, required this.text}) : super(key: key);
  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.all(10),
        child: Row(
          children: [
            Container(
              margin: const EdgeInsets.only(right: 16),
              child: const CircleAvatar(
                child: Icon(Icons.account_circle_rounded),
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(_name, style: Theme.of(context).textTheme.headline4),
                Container(
                  margin: const EdgeInsets.only(top: 5),
                  child: Text(text),
                )
              ],
            )
          ],
        ));
  }
}

class ChatScreen extends StatefulWidget {
  const ChatScreen({
    Key? key,
  }) : super(key: key);

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final List<ChatMessage> _message = [];
  final _textController = TextEditingController();
  final FocusNode _focusNode = FocusNode();
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
                  onSubmitted: _handleSubmitted,
                  decoration: const InputDecoration.collapsed(hintText: "点击输入"),
                  focusNode: _focusNode,
                ),
              ),
              IconButton(
                icon: const Icon(Icons.send_rounded),
                onPressed: () => _handleSubmitted(_textController.text),
              )
            ],
          ),
        ));
  }

  _handleSubmitted(String text) {
    _textController.clear();
    if (text.isNotEmpty) {
      var message = ChatMessage(
        text: text,
      );
      setState(() {
        _message.insert(0, message);
      });
      _focusNode.requestFocus();
      log(_message.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("聊天"),
      ),
      body: Column(
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
          )
        ],
      ),
    );
  }
}
