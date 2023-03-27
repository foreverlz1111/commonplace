import 'package:flutter/material.dart';
import 'dart:io';
import 'package:english_words/english_words.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(MaterialApp(home: MainApp()));
  if (Platform.isAndroid) {
    //设置Android状态栏透明
    SystemUiOverlayStyle systemUiOverlayStyle =
        const SystemUiOverlayStyle(statusBarColor: Colors.transparent);
    SystemChrome.setSystemUIOverlayStyle(systemUiOverlayStyle);
  }
}

class MainApp extends StatelessWidget {
  const MainApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    // final wordPair = WordPair.random();
    return MaterialApp(
      title: "启动",
      theme: ThemeData(
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.orange,
          foregroundColor: Colors.white,
        ),
      ),
      home: const RandomWords(),
    );
  }
}

class RandomWords extends StatefulWidget {
  const RandomWords({Key? key}) : super(key: key);
  @override
  _RandomWordsState createState() => _RandomWordsState();
}

class _RandomWordsState extends State<RandomWords> {
  final _suggestions = <WordPair>[];
  final _saved = <WordPair>{};
  final _biggerFont = const TextStyle(fontSize: 18);
  void _pushSave() {
    Navigator.of(context).push(MaterialPageRoute<void>(
      builder: (context) {
        final tiles = _saved.map(
              (pair) {
            return ListTile(
              title: Text(
                pair.asSnakeCase,
                style: _biggerFont,
              ),
            );
          },
        );
        final divided = tiles.isNotEmpty
            ? ListTile.divideTiles(tiles: tiles, context: context).toList()
            : <Widget>[];
        return Scaffold(
          appBar: AppBar(
            title: const Text("保存"),
          ),
          body: ListView(children: divided),
        );
      },
    ));
  }
  @override
  Widget build(BuildContext context) {
    // final wordPair = WordPair.random();
    return Scaffold(
      appBar: AppBar(
        // backgroundColor: Colors.orange,
        title: const Text("启动"),
        centerTitle: true,
        actions: [
          IconButton(
            onPressed: _pushSave,
            icon: const Icon(Icons.save_rounded),
            tooltip: "保存",
          ),
        ],
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemBuilder: (context, i) {
          if (i.isOdd) return const Divider();
          final index = i ~/ 2;
          if (index >= _suggestions.length) {
            _suggestions.addAll(generateWordPairs().take(10));
          }
          final alreadySaved = _saved.contains(_suggestions[index]);
          return ListTile(
            title: Text(
              index.toString() + " - " + _suggestions[index].asSnakeCase,
              style: _biggerFont,
            ),
            trailing: Icon(
              alreadySaved
                  ? Icons.favorite_rounded
                  : Icons.favorite_border_rounded,
              color: alreadySaved ? Colors.orange : null,
              semanticLabel: alreadySaved ? "移除喜欢" : "喜欢",
            ),
            onTap: () {
              setState(() {
                if (alreadySaved) {
                  _saved.remove(_suggestions[index]);
                } else {
                  _saved.add(_suggestions[index]);
                }
              });
            },
          );
        },
      ),
    );
    //return Container();
  }
}
