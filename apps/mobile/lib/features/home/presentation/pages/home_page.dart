import 'package:flutter/material.dart';

import '../../../../core/theme/app_theme.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: RichText(
          text: const TextSpan(
            children: [
              TextSpan(
                text: 'Pet',
                style: TextStyle(
                  color: AppTheme.petGreen,
                  fontWeight: FontWeight.w800,
                  fontSize: 22,
                ),
              ),
              TextSpan(
                text: 'Hub',
                style: TextStyle(
                  color: AppTheme.hubOrange,
                  fontWeight: FontWeight.w800,
                  fontSize: 22,
                ),
              ),
              TextSpan(
                text: '.id',
                style: TextStyle(
                  color: AppTheme.idBlack,
                  fontWeight: FontWeight.w700,
                  fontSize: 22,
                ),
              ),
            ],
          ),
        ),
      ),
      body: const Center(
        child: Text(
          'Home',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
    );
  }
}