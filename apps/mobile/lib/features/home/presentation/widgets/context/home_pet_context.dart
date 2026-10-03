import 'package:flutter/material.dart';

import 'package:mobile/core/theme/app_theme.dart';

class HomePetContext extends StatelessWidget {
  const HomePetContext({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(
        top: AppTheme.spacingL,
      ),
      width: double.infinity,
      padding: const EdgeInsets.all(
        AppTheme.spacingL,
      ),
      decoration: BoxDecoration(
        color: AppTheme.petGreenLight,
        borderRadius: BorderRadius.circular(
          AppTheme.radiusXLarge,
        ),
        border: Border.all(
          color: AppTheme.petGreen,
        ),
      ),
      child: const Text(
        'Pet Context',
        style: TextStyle(
          color: AppTheme.petGreen,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}