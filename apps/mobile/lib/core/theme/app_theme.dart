import 'package:flutter/material.dart';

class AppTheme {
  AppTheme._();

  // PetHub.id Brand DNA
  static const Color petGreen = Color(0xFF176B4D);
  static const Color hubOrange = Color(0xFFF28C28);
  static const Color idBlack = Color(0xFF1F1F1F);

  static ThemeData get light {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: Colors.white,

      colorScheme: ColorScheme.fromSeed(
        seedColor: petGreen,
        brightness: Brightness.light,
      ).copyWith(
        primary: petGreen,
        secondary: hubOrange,
      ),

      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.white,
        foregroundColor: idBlack,
        elevation: 0,
        centerTitle: false,
      ),

      textTheme: const TextTheme(
        headlineLarge: TextStyle(
          fontWeight: FontWeight.w700,
          color: idBlack,
        ),
        headlineMedium: TextStyle(
          fontWeight: FontWeight.w700,
          color: idBlack,
        ),
        titleLarge: TextStyle(
          fontWeight: FontWeight.w700,
          color: idBlack,
        ),
        bodyLarge: TextStyle(
          color: idBlack,
        ),
        bodyMedium: TextStyle(
          color: idBlack,
        ),
      ),
    );
  }
}