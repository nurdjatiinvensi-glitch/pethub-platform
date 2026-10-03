import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mobile/core/theme/app_theme.dart';

class PetHubHubButton extends StatelessWidget {
  final VoidCallback onPressed;

  const PetHubHubButton({super.key, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Transform.translate(
      offset: const Offset(0, -16),
      child: GestureDetector(
        onTap: onPressed,
        child: Container(
          width: 66,
          height: 66,
          decoration: BoxDecoration(
            color: Colors.white,
            shape: BoxShape.circle,
            border: Border.all(color: AppTheme.petGreenLight, width: 3),
            boxShadow: const [
              BoxShadow(
                color: Color(0x30000000),
                blurRadius: 14,
                offset: Offset(0, 6),
              ),
            ],
          ),
          child: Center(
            child: SvgPicture.asset(
              'assets/branding/pethub_pin.svg',
              width: 42,
              height: 49,
            ),
          ),
        ),
      ),
    );
  }
}
