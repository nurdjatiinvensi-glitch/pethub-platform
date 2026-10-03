import 'package:flutter/material.dart';

import 'package:mobile/features/home/presentation/widgets/context/home_context.dart';
import 'package:mobile/features/home/presentation/widgets/home_greeting.dart';
import 'package:mobile/features/home/presentation/widgets/home_nearby_preview.dart';
import 'package:mobile/features/home/presentation/widgets/home_quick_actions.dart';
import 'package:mobile/features/home/presentation/widgets/home_recommendations.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          HomeGreeting(),
          HomeContext(
            hasPet: false,
          ),
          HomeQuickActions(),
          HomeNearbyPreview(),
          HomeRecommendations(),
        ],
      ),
    );
  }
}