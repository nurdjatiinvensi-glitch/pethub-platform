import 'package:flutter/material.dart';

import 'package:mobile/core/theme/app_theme.dart';

class HomeNoPetContext extends StatelessWidget {
  const HomeNoPetContext({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(
      top: AppTheme.spacingL,
      ),
      width: double.infinity,
      height: 180,
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(AppTheme.radiusXLarge),
        border: Border.all(
          color: AppTheme.petGreen,
        ),
        boxShadow: const [
          BoxShadow(
            color: Color(0x29000000),
            blurRadius: 16,
            offset: Offset(0, 5),
          ),
        ],
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFF8FDDA0),
            AppTheme.petGreen,
          ],
        ),
      ),
      child: Stack(
        children: [
          // ======================================================
          // Decorative background
          // ======================================================

          Positioned(
            left: -35,
            bottom: -55,
            child: _DecorationCircle(
              size: 150,
              color: Colors.white.withValues(alpha: 0.13),
            ),
          ),

          Positioned(
            left: 55,
            bottom: -70,
            child: _DecorationCircle(
              size: 155,
              color: Colors.white.withValues(alpha: 0.10),
            ),
          ),

          Positioned(
            right: -35,
            top: -45,
            child: _DecorationCircle(
              size: 125,
              color: Colors.white.withValues(alpha: 0.08),
            ),
          ),

          // ======================================================
          // Decorative pets
          // ======================================================

          Positioned(
            left: 18,
            bottom: 18,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                _PetDecoration(
                  size: 54,
                  opacity: 0.20,
                ),
                const SizedBox(width: 2),
                _PetDecoration(
                  size: 42,
                  opacity: 0.15,
                ),
              ],
            ),
          ),

          // ======================================================
          // Content
          // ======================================================

          Positioned(
            top: 13,
            right: 18,
            bottom: 13,
            child: SizedBox(
              width: 215,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Temukan pengalaman\n'
                    'seru bersama dunia pet.',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      height: 1.02,
                      fontWeight: FontWeight.w900,
                      letterSpacing: -0.25,
                    ),
                  ),

                  const SizedBox(height: 7),

                  const Text(
                    'Jelajahi komunitas, layanan, event, dan '
                    'berbagai kebutuhan pet di sekitar kamu.',
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 8.5,
                      height: 1.25,
                      fontWeight: FontWeight.w500,
                    ),
                  ),

                  const Spacer(),

                  _AddPetButton(
                    onPressed: () {},
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _AddPetButton extends StatelessWidget {
  final VoidCallback onPressed;

  const _AddPetButton({
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: AppTheme.hubOrange,
      borderRadius: BorderRadius.circular(30),
      child: InkWell(
        onTap: onPressed,
        borderRadius: BorderRadius.circular(30),
        child: const Padding(
          padding: EdgeInsets.symmetric(
            horizontal: 9,
            vertical: 5,
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(
                width: 22,
                height: 22,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    color: Color(0x25FFFFFF),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.pets_rounded,
                    color: Colors.white,
                    size: 12,
                  ),
                ),
              ),
              SizedBox(width: 6),
              Text(
                'Tambah Pet',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 9,
                  fontWeight: FontWeight.w700,
                ),
              ),
              SizedBox(width: 4),
              Icon(
                Icons.chevron_right_rounded,
                color: Colors.white,
                size: 14,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _DecorationCircle extends StatelessWidget {
  final double size;
  final Color color;

  const _DecorationCircle({
    required this.size,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: color,
      ),
    );
  }
}

class _PetDecoration extends StatelessWidget {
  final double size;
  final double opacity;

  const _PetDecoration({
    required this.size,
    required this.opacity,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: opacity),
        shape: BoxShape.circle,
      ),
      child: Icon(
        Icons.pets_rounded,
        size: size * 0.45,
        color: Colors.white.withValues(alpha: 0.85),
      ),
    );
  }
}