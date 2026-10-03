import 'package:flutter/material.dart';
import 'package:mobile/core/theme/app_theme.dart';

void showPetHubHub(BuildContext context) {
  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    barrierColor: Colors.black54,
    builder: (_) {
      return const _PetHubHubSheet();
    },
  );
}

class _PetHubHubSheet extends StatelessWidget {
  const _PetHubHubSheet();

  static const List<_EcosystemItem> _items = [
    _EcosystemItem(
      title: 'Community',
      icon: Icons.favorite_outline_rounded,
      color: Color(0xFFE83D91),
      backgroundColor: Color(0xFFFFF0F7),
    ),
    _EcosystemItem(
      title: 'Marketplace',
      icon: Icons.shopping_bag_outlined,
      color: AppTheme.hubOrange,
      backgroundColor: Color(0xFFFFF1E3),
    ),
    _EcosystemItem(
      title: 'Veterinary',
      icon: Icons.medical_services_outlined,
      color: Color(0xFF3978D8),
      backgroundColor: Color(0xFFEEF4FF),
    ),
    _EcosystemItem(
      title: 'Grooming',
      icon: Icons.auto_awesome_outlined,
      color: Color(0xFF7B61D9),
      backgroundColor: Color(0xFFF5F0FF),
    ),
    _EcosystemItem(
      title: 'Pet Hotel',
      icon: Icons.hotel_outlined,
      color: Color(0xFF00A9C7),
      backgroundColor: Color(0xFFEAFBFD),
    ),
    _EcosystemItem(
      title: 'Adoption',
      icon: Icons.pets_outlined,
      color: AppTheme.petGreen,
      backgroundColor: Color(0xFFEAF9F2),
    ),
    _EcosystemItem(
      title: 'Event',
      icon: Icons.event_outlined,
      color: Color(0xFFE8A400),
      backgroundColor: Color(0xFFFFF9DF),
    ),
    _EcosystemItem(
      title: 'AI Assistant',
      icon: Icons.auto_awesome_outlined,
      color: Color(0xFF7B61D9),
      backgroundColor: Color(0xFFF5F0FF),
    ),
    _EcosystemItem(
      title: 'Pet Passport',
      icon: Icons.badge_outlined,
      color: AppTheme.petGreen,
      backgroundColor: Color(0xFFEAF9F2),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: false,
      child: FractionallySizedBox(
        heightFactor: 0.82,
        child: Container(
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
          ),
          child: Column(
            children: [
              const SizedBox(height: 12),

              Container(
                width: 72,
                height: 6,
                decoration: BoxDecoration(
                  color: const Color(0xFFD1D5DB),
                  borderRadius: BorderRadius.circular(10),
                ),
              ),

              const SizedBox(height: 18),

              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'PetHub.id',
                            style: TextStyle(
                              color: AppTheme.petGreen,
                              fontSize: 13,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          const SizedBox(height: 3),
                          const Text(
                            'Ekosistem PetHub',
                            style: TextStyle(
                              color: AppTheme.textPrimary,
                              fontSize: 27,
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Material(
                      color: const Color(0xFFF3F4F6),
                      shape: const CircleBorder(),
                      child: InkWell(
                        onTap: () {
                          Navigator.of(context).pop();
                        },
                        customBorder: const CircleBorder(),
                        child: const SizedBox(
                          width: 52,
                          height: 52,
                          child: Icon(
                            Icons.close_rounded,
                            size: 28,
                            color: AppTheme.textPrimary,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 18),

              const Divider(height: 1, color: AppTheme.border),

              Expanded(
                child: GridView.builder(
                  padding: const EdgeInsets.fromLTRB(24, 24, 24, 32),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 3,
                    crossAxisSpacing: 14,
                    mainAxisSpacing: 22,
                    mainAxisExtent: 108,
                  ),
                  itemCount: _items.length,
                  itemBuilder: (context, index) {
                    return _EcosystemCard(item: _items[index]);
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _EcosystemCard extends StatelessWidget {
  final _EcosystemItem item;

  const _EcosystemCard({required this.item});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        // Detail ecosystem akan kita isi nanti.
      },
      borderRadius: BorderRadius.circular(AppTheme.radiusMedium),
      child: Column(
        children: [
          Container(
            width: 62,
            height: 62,
            decoration: BoxDecoration(
              color: item.backgroundColor,
              shape: BoxShape.circle,
            ),
            child: Icon(item.icon, color: item.color, size: 30),
          ),
          const SizedBox(height: 9),
          Text(
            item.title,
            textAlign: TextAlign.center,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              color: AppTheme.textPrimary,
              fontSize: 11,
              height: 1.15,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}

class _EcosystemItem {
  final String title;
  final IconData icon;
  final Color color;
  final Color backgroundColor;

  const _EcosystemItem({
    required this.title,
    required this.icon,
    required this.color,
    required this.backgroundColor,
  });
}
