import 'package:flutter/material.dart';

class AppTheme {
  AppTheme._();

  // ============================================================
  // PetHub.id Brand Colors
  // ============================================================

  static const Color petGreen = Color(0xFF176B4D);
  static const Color petGreenDark = Color(0xFF105239);
  static const Color petGreenLight = Color(0xFFE7F5EF);

  static const Color hubOrange = Color(0xFFF28C28);
  static const Color hubOrangeSoft = Color(0xFFFFF1E3);

  static const Color idBlack = Color(0xFF1F1F1F);

  // ============================================================
  // Semantic Colors
  // ============================================================

  static const Color success = Color(0xFF2E9B62);
  static const Color warning = Color(0xFFF2A529);
  static const Color error = Color(0xFFD64545);
  static const Color info = Color(0xFF3978D8);

  static const Color textPrimary = idBlack;
  static const Color textSecondary = Color(0xFF6B7280);
  static const Color textMuted = Color(0xFF9CA3AF);

  static const Color surface = Colors.white;
  static const Color background = Color(0xFFF8FAF9);
  static const Color border = Color(0xFFE5E7EB);

  // ============================================================
  // Radius
  // ============================================================

  static const double radiusSmall = 10;
  static const double radiusMedium = 16;
  static const double radiusLarge = 20;
  static const double radiusXLarge = 28;

  // ============================================================
  // Spacing
  // ============================================================

  static const double spacingXS = 4;
  static const double spacingS = 8;
  static const double spacingM = 12;
  static const double spacingL = 16;
  static const double spacingXL = 24;
  static const double spacingXXL = 32;

  // ============================================================
  // Theme
  // ============================================================

  static ThemeData get light {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: petGreen,
      brightness: Brightness.light,
    ).copyWith(
      primary: petGreen,
      onPrimary: Colors.white,
      secondary: hubOrange,
      onSecondary: Colors.white,
      surface: surface,
      onSurface: idBlack,
      error: error,
      onError: Colors.white,
    );

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: background,

      appBarTheme: const AppBarTheme(
        backgroundColor: surface,
        foregroundColor: idBlack,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: false,
      ),

      cardTheme: CardThemeData(
        color: surface,
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusMedium),
        ),
      ),

      dividerTheme: const DividerThemeData(
        color: border,
        thickness: 1,
        space: 1,
      ),

      textTheme: const TextTheme(
        displayLarge: TextStyle(
          color: idBlack,
          fontWeight: FontWeight.w800,
        ),
        displayMedium: TextStyle(
          color: idBlack,
          fontWeight: FontWeight.w800,
        ),
        displaySmall: TextStyle(
          color: idBlack,
          fontWeight: FontWeight.w800,
        ),
        headlineLarge: TextStyle(
          color: idBlack,
          fontWeight: FontWeight.w800,
        ),
        headlineMedium: TextStyle(
          color: idBlack,
          fontWeight: FontWeight.w700,
        ),
        headlineSmall: TextStyle(
          color: idBlack,
          fontWeight: FontWeight.w700,
        ),
        titleLarge: TextStyle(
          color: idBlack,
          fontWeight: FontWeight.w700,
        ),
        titleMedium: TextStyle(
          color: idBlack,
          fontWeight: FontWeight.w600,
        ),
        titleSmall: TextStyle(
          color: idBlack,
          fontWeight: FontWeight.w600,
        ),
        bodyLarge: TextStyle(
          color: idBlack,
        ),
        bodyMedium: TextStyle(
          color: textSecondary,
        ),
        bodySmall: TextStyle(
          color: textSecondary,
        ),
        labelLarge: TextStyle(
          fontWeight: FontWeight.w600,
        ),
      ),

      navigationBarTheme: const NavigationBarThemeData(
        backgroundColor: surface,
        elevation: 0,
        indicatorColor: petGreenLight,
        labelTextStyle: WidgetStatePropertyAll(
          TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}