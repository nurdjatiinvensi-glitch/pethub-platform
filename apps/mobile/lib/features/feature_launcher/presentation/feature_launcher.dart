import 'package:flutter/material.dart';
import 'package:mobile/features/feature_launcher/presentation/widgets/features_bottom_sheet.dart';

void showFeatureLauncher(BuildContext context) {
  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    barrierColor: Colors.black54,
    builder: (_) {
      return const FeaturesBottomSheet();
    },
  );
}
