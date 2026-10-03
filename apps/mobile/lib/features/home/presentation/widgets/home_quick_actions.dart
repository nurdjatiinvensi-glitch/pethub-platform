import 'package:flutter/material.dart';

import 'package:mobile/core/theme/app_theme.dart';

class HomeQuickActions extends StatelessWidget {
  const HomeQuickActions({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        top: AppTheme.spacingXXL,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Apa yang ingin kamu lakukan?',
            style: TextStyle(
              color: AppTheme.textPrimary,
              fontSize: 16,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: AppTheme.spacingM),
          Row(
            children: const [
              Expanded(
                child: _QuickActionCard(
                  icon: Icons.location_on_outlined,
                  label: 'Nearby',
                  description: 'Temukan di sekitar',
                  iconColor: AppTheme.petGreen,
                  backgroundColor: Color(0xFFEAF9F2),
                ),
              ),
              SizedBox(width: AppTheme.spacingS),
              Expanded(
                child: _QuickActionCard(
                  icon: Icons.calendar_month_outlined,
                  label: 'Appointment',
                  description: 'Jadwal & booking',
                  iconColor: Color(0xFF3978D8),
                  backgroundColor: Color(0xFFEEF4FF),
                ),
              ),
              SizedBox(width: AppTheme.spacingS),
              Expanded(
                child: _QuickActionCard(
                  icon: Icons.inventory_2_outlined,
                  label: 'Pesanan',
                  description: 'Produk & layanan',
                  iconColor: AppTheme.hubOrange,
                  backgroundColor: Color(0xFFFFF5EA),
                ),
              ),
              SizedBox(width: AppTheme.spacingS),
              Expanded(
                child: _QuickActionCard(
                  icon: Icons.people_outline_rounded,
                  label: 'Komunitas',
                  description: 'Diskusi & berbagi',
                  iconColor: Color(0xFFE83D91),
                  backgroundColor: Color(0xFFFFF0F7),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _QuickActionCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final String description;
  final Color iconColor;
  final Color backgroundColor;

  const _QuickActionCard({
    required this.icon,
    required this.label,
    required this.description,
    required this.iconColor,
    required this.backgroundColor,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: backgroundColor,
      borderRadius: BorderRadius.circular(
        AppTheme.radiusMedium,
      ),
      child: InkWell(
        onTap: () {},
        borderRadius: BorderRadius.circular(
          AppTheme.radiusMedium,
        ),
        child: SizedBox(
          height: 108,
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 4,
              vertical: 10,
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(
                      alpha: 0.72,
                    ),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    icon,
                    color: iconColor,
                    size: 22,
                  ),
                ),
                const SizedBox(height: 7),
                Text(
                  label,
                  textAlign: TextAlign.center,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: AppTheme.textPrimary,
                    fontSize: 10,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  description,
                  textAlign: TextAlign.center,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: AppTheme.textSecondary,
                    fontSize: 7,
                    fontWeight: FontWeight.w400,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}