import 'package:flutter/material.dart';
import 'package:mobile/app/widgets/pethub_hub_button.dart';
import 'package:mobile/core/theme/app_theme.dart';

class AppBottomNavigation extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onDestinationSelected;
  final VoidCallback onPetHubTap;

  const AppBottomNavigation({
    super.key,
    required this.currentIndex,
    required this.onDestinationSelected,
    required this.onPetHubTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        boxShadow: [
          BoxShadow(
            color: Color(0x18000000),
            blurRadius: 18,
            offset: Offset(0, -5),
          ),
        ],
      ),
      child: SafeArea(
        top: false,
        child: SizedBox(
          height: 76,
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              Row(
                children: [
                  Expanded(
                    child: _NavItem(
                      icon: Icons.home_outlined,
                      selectedIcon: Icons.home_rounded,
                      label: 'Home',
                      selected: currentIndex == 0,
                      onTap: () {
                        onDestinationSelected(0);
                      },
                    ),
                  ),
                  Expanded(
                    child: _NavItem(
                      icon: Icons.apps_outlined,
                      selectedIcon: Icons.apps_rounded,
                      label: 'Menu',
                      selected: currentIndex == 1,
                      onTap: () {
                        onDestinationSelected(1);
                      },
                    ),
                  ),

                  // Space for central PetHub button.
                  const SizedBox(width: 76),

                  Expanded(
                    child: _NavItem(
                      icon: Icons.checklist_outlined,
                      selectedIcon: Icons.checklist_rounded,
                      label: 'Aktivitas',
                      selected: currentIndex == 2,
                      onTap: () {
                        onDestinationSelected(2);
                      },
                    ),
                  ),
                  Expanded(
                    child: _NavItem(
                      icon: Icons.person_outline_rounded,
                      selectedIcon: Icons.person_rounded,
                      label: 'Profil',
                      selected: currentIndex == 3,
                      onTap: () {
                        onDestinationSelected(3);
                      },
                    ),
                  ),
                ],
              ),

              // Central PetHub button
              Positioned(
                left: 0,
                right: 0,
                top: 0,
                child: Center(child: PetHubHubButton(onPressed: onPetHubTap)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final IconData icon;
  final IconData selectedIcon;
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _NavItem({
    required this.icon,
    required this.selectedIcon,
    required this.label,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final color = selected ? AppTheme.petGreen : AppTheme.textSecondary;

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        child: SizedBox(
          height: 76,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(selected ? selectedIcon : icon, color: color, size: 24),
              const SizedBox(height: 5),
              Text(
                label,
                style: TextStyle(
                  color: color,
                  fontSize: 11,
                  fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
