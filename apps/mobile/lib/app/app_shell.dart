import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/app/app_header.dart';
import 'package:mobile/app/widgets/app_bottom_navigation.dart';
import 'package:mobile/features/pethub_hub/presentation/pethub_hub_launcher.dart';

class AppShell extends StatelessWidget {
  final StatefulNavigationShell navigationShell;

  const AppShell({super.key, required this.navigationShell});

  void _onDestinationSelected(BuildContext context, int index) {
    navigationShell.goBranch(
      index,
      initialLocation: index == navigationShell.currentIndex,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const AppHeader(),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: navigationShell,
            ),
          ),
        ],
      ),
      bottomNavigationBar: AppBottomNavigation(
        currentIndex: navigationShell.currentIndex,
        onDestinationSelected: (index) {
          _onDestinationSelected(context, index);
        },
        onPetHubTap: () {
          showPetHubHub(context);
        },
      ),
    );
  }
}
