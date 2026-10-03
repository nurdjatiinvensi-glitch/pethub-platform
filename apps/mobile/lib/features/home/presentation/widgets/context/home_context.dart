import 'package:flutter/material.dart';

import 'home_no_pet_context.dart';
import 'home_pet_context.dart';

class HomeContext extends StatelessWidget {
  final bool hasPet;

  const HomeContext({
    super.key,
    required this.hasPet,
  });

  @override
  Widget build(BuildContext context) {
    if (hasPet) {
      return const HomePetContext();
    }

    return const HomeNoPetContext();
  }
}