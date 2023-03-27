import 'dart:math';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'dart:io';
import 'package:flutter/services.dart';
import 'package:toml/toml.dart';
import 'dart:async';
import 'package:yaml/yaml.dart';

void main() {
  runApp(const MyApp());

  if (Platform.isAndroid) {
    SystemUiOverlayStyle systemUiOverlayStyle =
        const SystemUiOverlayStyle(statusBarColor: Colors.transparent);
    SystemChrome.setSystemUIOverlayStyle(systemUiOverlayStyle);
  }
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'title',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Toml Demo'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: FutureBuilder<String>(
          future: rootBundle.loadString('assets/example.toml'),
          builder: (context, snapshot) {
            final text = snapshot.data;
            if (text == null) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }
            final toml = TomlDocument.parse(text).toMap();
            return Center(
              child: ListView.builder(
                itemCount: toml["string"].length,
                itemBuilder: (BuildContext context, int index) {
                  return Center(
                      child: Column(
                    children: [
                      Text(toml["string"][index],
                          style: const TextStyle(fontSize: 18)),
                      const Divider(
                        height: 20,
                      ),
                    ],
                  ));
                },
              ),
            );
          }),
    );
  }
}
