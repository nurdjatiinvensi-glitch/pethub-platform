import 'package:flutter/material.dart';

import 'package:mobile/core/theme/app_theme.dart';

class HomeGreeting extends StatelessWidget {
  const HomeGreeting({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
  margin: const EdgeInsets.only(
  top: AppTheme.spacingM,
),
      padding: const EdgeInsets.fromLTRB(
        AppTheme.spacingM,
        AppTheme.spacingM,
        AppTheme.spacingS,
        AppTheme.spacingM,
      ),
      decoration: BoxDecoration(
        color: AppTheme.hubOrangeSoft,
        borderRadius: BorderRadius.circular(AppTheme.radiusLarge),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Halo,',
                  style: TextStyle(
                    fontSize: 13,
                    height: 1.1,
                    color: AppTheme.textPrimary,
                  ),
                ),
                const SizedBox(height: AppTheme.spacingXS),
                RichText(
                  text: const TextSpan(
                    children: [
                      TextSpan(
                        text: 'Pet',
                        style: TextStyle(
                          color: AppTheme.petGreen,
                          fontSize: 25,
                          height: 1,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      TextSpan(
                        text: 'Lover!',
                        style: TextStyle(
                          color: AppTheme.hubOrange,
                          fontSize: 25,
                          height: 1,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      WidgetSpan(
                        alignment: PlaceholderAlignment.middle,
                        child: Padding(
                          padding: EdgeInsets.only(left: 5),
                          child: Icon(
                            Icons.pets_rounded,
                            size: 18,
                            color: AppTheme.petGreen,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppTheme.spacingXS),
                const Text(
                  'Apa kabar hari ini?',
                  style: TextStyle(
                    fontSize: 12,
                    height: 1.1,
                    color: AppTheme.textPrimary,
                  ),
                ),
              ],
            ),
          ),

          // Temporary profile placeholder.
          // Will later receive the user's actual profile image.
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: AppTheme.petGreenLight,
              border: Border.all(
                color: Colors.white,
                width: 2,
              ),
              boxShadow: const [
                BoxShadow(
                  color: Color(0x18000000),
                  blurRadius: 8,
                  offset: Offset(0, 3),
                ),
              ],
            ),
            child: const Icon(
              Icons.person_rounded,
              color: AppTheme.petGreen,
              size: 25,
            ),
          ),
        ],
      ),
    );
  }
}