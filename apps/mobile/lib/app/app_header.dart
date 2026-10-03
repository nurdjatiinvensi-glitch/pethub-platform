import 'package:flutter/material.dart';

import 'package:mobile/core/theme/app_theme.dart';

class AppHeader extends StatelessWidget {
  const AppHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      bottom: false,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(
          10,
          12,
          10,
          12,
        ),
        child: Row(
          children: [
            RichText(
              text: const TextSpan(
                children: [
                  TextSpan(
                    text: 'Pet',
                    style: TextStyle(
                      color: AppTheme.petGreen,
                      fontWeight: FontWeight.w800,
                      fontSize: 22,
                    ),
                  ),
                  TextSpan(
                    text: 'Hub',
                    style: TextStyle(
                      color: AppTheme.hubOrange,
                      fontWeight: FontWeight.w800,
                      fontSize: 22,
                    ),
                  ),
                  TextSpan(
                    text: '.id',
                    style: TextStyle(
                      color: AppTheme.idBlack,
                      fontWeight: FontWeight.w700,
                      fontSize: 22,
                    ),
                  ),
                ],
              ),
            ),
            const Spacer(),
            IconButton(
              onPressed: () {},
              tooltip: 'Notifikasi',
              icon: const Icon(
                Icons.notifications_none_rounded,
                size: 26,
              ),
            ),
          ],
        ),
      ),
    );
  }
}