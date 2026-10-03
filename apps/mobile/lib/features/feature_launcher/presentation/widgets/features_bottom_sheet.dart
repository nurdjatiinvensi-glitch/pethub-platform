import 'package:flutter/material.dart';
import 'package:mobile/core/theme/app_theme.dart';
import 'package:mobile/features/feature_launcher/presentation/widgets/feature_grid_item.dart';

class FeaturesBottomSheet extends StatefulWidget {
  const FeaturesBottomSheet({super.key});

  @override
  State<FeaturesBottomSheet> createState() => _FeaturesBottomSheetState();
}

class _FeaturesBottomSheetState extends State<FeaturesBottomSheet> {
  final TextEditingController _searchController = TextEditingController();

  static const List<FeatureItem> _features = [
    FeatureItem(
      title: 'Nearby',
      icon: Icons.location_on_outlined,
      color: AppTheme.petGreen,
      backgroundColor: Color(0xFFEAF9F2),
    ),
    FeatureItem(
      title: 'Appointment',
      icon: Icons.calendar_month_outlined,
      color: Color(0xFF3978D8),
      backgroundColor: Color(0xFFEEF4FF),
    ),
    FeatureItem(
      title: 'Pesanan',
      icon: Icons.inventory_2_outlined,
      color: AppTheme.hubOrange,
      backgroundColor: Color(0xFFFFF5EA),
    ),
    FeatureItem(
      title: 'Komunitas',
      icon: Icons.people_outline_rounded,
      color: Color(0xFFE83D91),
      backgroundColor: Color(0xFFFFF0F7),
    ),
    FeatureItem(
      title: 'Grooming',
      icon: Icons.content_cut_outlined,
      color: AppTheme.hubOrange,
      backgroundColor: Color(0xFFFFF1E3),
    ),
    FeatureItem(
      title: 'Pet Shop',
      icon: Icons.shopping_bag_outlined,
      color: AppTheme.petGreen,
      backgroundColor: Color(0xFFEAF9F2),
    ),
    FeatureItem(
      title: 'Pet Hotel',
      icon: Icons.hotel_outlined,
      color: Color(0xFF3978D8),
      backgroundColor: Color(0xFFEEF4FF),
    ),
    FeatureItem(
      title: 'Veterinary',
      icon: Icons.medical_services_outlined,
      color: Color(0xFF7B61D9),
      backgroundColor: Color(0xFFF5F0FF),
    ),
    FeatureItem(
      title: 'Event',
      icon: Icons.event_outlined,
      color: Color(0xFFE83D91),
      backgroundColor: Color(0xFFFFF0F7),
    ),
    FeatureItem(
      title: 'Adoption',
      icon: Icons.pets_outlined,
      color: AppTheme.petGreen,
      backgroundColor: Color(0xFFEAF9F2),
    ),
    FeatureItem(
      title: 'Pet Passport',
      icon: Icons.badge_outlined,
      color: Color(0xFF3978D8),
      backgroundColor: Color(0xFFEEF4FF),
    ),
    FeatureItem(
      title: 'AI Assistant',
      icon: Icons.auto_awesome_outlined,
      color: Color(0xFF7B61D9),
      backgroundColor: Color(0xFFF5F0FF),
    ),
  ];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  List<FeatureItem> get _filteredFeatures {
    final query = _searchController.text.trim().toLowerCase();

    if (query.isEmpty) {
      return _features;
    }

    return _features
        .where((feature) => feature.title.toLowerCase().contains(query))
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    final bottomInset = MediaQuery.viewInsetsOf(context).bottom;

    return SafeArea(
      top: false,
      child: Padding(
        padding: EdgeInsets.only(bottom: bottomInset),
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

                // ==================================================
                // Drag handle
                // ==================================================
                Container(
                  width: 72,
                  height: 6,
                  decoration: BoxDecoration(
                    color: const Color(0xFFD1D5DB),
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),

                const SizedBox(height: 20),

                // ==================================================
                // Header
                // ==================================================
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: Row(
                    children: [
                      const Expanded(
                        child: Text(
                          'Semua Fitur',
                          style: TextStyle(
                            color: AppTheme.textPrimary,
                            fontSize: 28,
                            fontWeight: FontWeight.w800,
                          ),
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

                const SizedBox(height: 20),

                const Divider(height: 1, color: AppTheme.border),

                // ==================================================
                // Search
                // ==================================================
                Padding(
                  padding: const EdgeInsets.fromLTRB(24, 20, 24, 20),
                  child: TextField(
                    controller: _searchController,
                    onChanged: (_) {
                      setState(() {});
                    },
                    decoration: InputDecoration(
                      hintText: 'Cari fitur...',
                      hintStyle: const TextStyle(
                        color: AppTheme.textMuted,
                        fontSize: 16,
                      ),
                      prefixIcon: const Icon(
                        Icons.search_rounded,
                        color: AppTheme.textSecondary,
                        size: 27,
                      ),
                      filled: true,
                      fillColor: const Color(0xFFF3F4F6),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(
                          AppTheme.radiusMedium,
                        ),
                        borderSide: BorderSide.none,
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(
                          AppTheme.radiusMedium,
                        ),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(
                          AppTheme.radiusMedium,
                        ),
                        borderSide: const BorderSide(color: AppTheme.petGreen),
                      ),
                      contentPadding: const EdgeInsets.symmetric(vertical: 18),
                    ),
                  ),
                ),

                // ==================================================
                // Feature Grid
                // ==================================================
                Expanded(
                  child: GridView.builder(
                    padding: const EdgeInsets.fromLTRB(24, 4, 24, 32),
                    keyboardDismissBehavior:
                        ScrollViewKeyboardDismissBehavior.onDrag,
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 3,
                          crossAxisSpacing: 18,
                          mainAxisSpacing: 22,
                          mainAxisExtent: 104,
                        ),
                    itemCount: _filteredFeatures.length,
                    itemBuilder: (context, index) {
                      return FeatureGridItem(feature: _filteredFeatures[index]);
                    },
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
