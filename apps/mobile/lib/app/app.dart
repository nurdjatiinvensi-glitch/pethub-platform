import 'package:flutter/material.dart';

import 'package:mobile/app/router.dart';
import 'package:mobile/core/theme/app_theme.dart';

class PetHubApp extends StatelessWidget {
  const PetHubApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'PetHub.id',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      routerConfig: appRouter,
    );
  }
}