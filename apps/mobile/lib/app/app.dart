import 'package:flutter/material.dart';

import '../core/theme/app_theme.dart';
import 'router.dart';

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