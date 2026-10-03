import 'package:flutter/material.dart';

import 'package:mobile/core/theme/app_theme.dart';
import 'package:mobile/shared/widgets/section_header.dart';

class HomeRecommendations extends StatelessWidget {
  const HomeRecommendations({super.key});

  static const List<_RecommendationItem> _items = [
    _RecommendationItem(
      title: 'Pet Shop & Supplies',
      subtitle: 'Kebutuhan pet pilihan',
      icon: Icons.shopping_bag_rounded,
      backgroundColor: Color(0xFFEAF9F2),
      iconColor: AppTheme.petGreen,
    ),
    _RecommendationItem(
      title: 'Grooming',
      subtitle: 'Rawat pet lebih nyaman',
      icon: Icons.content_cut_rounded,
      backgroundColor: Color(0xFFFFF1E3),
      iconColor: AppTheme.hubOrange,
    ),
    _RecommendationItem(
      title: 'Pet Hotel',
      subtitle: 'Tempat nyaman untuk pet',
      icon: Icons.hotel_rounded,
      backgroundColor: Color(0xFFEEF4FF),
      iconColor: Color(0xFF3978D8),
    ),
    _RecommendationItem(
      title: 'Veterinary',
      subtitle: 'Jaga kesehatan pet',
      icon: Icons.medical_services_rounded,
      backgroundColor: Color(0xFFF5F0FF),
      iconColor: Color(0xFF7B61D9),
    ),
    _RecommendationItem(
      title: 'Event',
      subtitle: 'Aktivitas seru bersama',
      icon: Icons.event_rounded,
      backgroundColor: Color(0xFFFFF0F7),
      iconColor: Color(0xFFE83D91),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        top: AppTheme.spacingXXL,
        bottom: AppTheme.spacingXXL,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SectionHeader(
            title: 'Rekomendasi untuk kamu',
            actionLabel: 'Lihat semua',
          ),
          const SizedBox(
            height: AppTheme.spacingM,
          ),
          SizedBox(
            height: 156,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              physics: const BouncingScrollPhysics(),
              itemCount: _items.length,
              separatorBuilder: (_, _) => const SizedBox(
                width: AppTheme.spacingS,
              ),
              itemBuilder: (context, index) {
                return _RecommendationCard(
                  item: _items[index],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _RecommendationCard extends StatelessWidget {
  final _RecommendationItem item;

  const _RecommendationCard({
    required this.item,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 145,
      child: Material(
        color: Colors.white,
        borderRadius: BorderRadius.circular(
          AppTheme.radiusMedium,
        ),
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: () {},
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: 92,
                width: double.infinity,
                color: item.backgroundColor,
                child: Center(
                  child: Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(
                        alpha: 0.8,
                      ),
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      item.icon,
                      color: item.iconColor,
                      size: 25,
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(
                    10,
                    8,
                    10,
                    8,
                  ),
                  child: Column(
                    crossAxisAlignment:
                        CrossAxisAlignment.start,
                    children: [
                      Text(
                        item.title,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          color: AppTheme.textPrimary,
                          fontSize: 11,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      const SizedBox(height: 3),
                      Text(
                        item.subtitle,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          color: AppTheme.textSecondary,
                          fontSize: 8,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _RecommendationItem {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color backgroundColor;
  final Color iconColor;

  const _RecommendationItem({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.backgroundColor,
    required this.iconColor,
  });
}