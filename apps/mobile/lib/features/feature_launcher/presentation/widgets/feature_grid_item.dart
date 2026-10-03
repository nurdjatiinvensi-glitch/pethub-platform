import 'package:flutter/material.dart';
import 'package:mobile/core/theme/app_theme.dart';

class FeatureGridItem extends StatelessWidget {
  final FeatureItem feature;

  const FeatureGridItem({super.key, required this.feature});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {
          // Navigation fitur akan kita isi nanti.
        },
        borderRadius: BorderRadius.circular(AppTheme.radiusMedium),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  color: feature.backgroundColor,
                  shape: BoxShape.circle,
                ),
                child: Icon(feature.icon, color: feature.color, size: 30),
              ),
              const SizedBox(height: 9),
              Text(
                feature.title,
                textAlign: TextAlign.center,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  color: AppTheme.textPrimary,
                  fontSize: 12,
                  height: 1.15,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class FeatureItem {
  final String title;
  final IconData icon;
  final Color color;
  final Color backgroundColor;

  const FeatureItem({
    required this.title,
    required this.icon,
    required this.color,
    required this.backgroundColor,
  });
}
