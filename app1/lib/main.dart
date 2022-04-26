import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';
//滑动的时候特别卡
void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    // final wordPair = WordPair.random();
    return const MaterialApp(
      home: RandomWords(),
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
  final _biggerFont = const TextStyle(fontSize: 18);
  @override
  Widget build(BuildContext context) {
    // final wordPair = WordPair.random();
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.orange,
        title: const Text("启动"),
        centerTitle: true,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemBuilder: (context, i) {
          if (i.isOdd) return const Divider();
          final index = i ~/ 2;
          if (index >= _suggestions.length) {
            _suggestions.addAll(generateWordPairs().take(10));
          }
          return ListTile(
            title: Text(
              index.toString() + " - " + _suggestions[index].asSnakeCase,
              style: _biggerFont,
            ),
          );
        },
      ),
    );
    //return Container();
  }
}
