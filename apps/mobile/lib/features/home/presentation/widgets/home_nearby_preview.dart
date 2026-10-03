import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:geolocator/geolocator.dart';
import 'package:latlong2/latlong.dart';

import 'package:mobile/core/theme/app_theme.dart';
import 'package:mobile/shared/widgets/section_header.dart';

class HomeNearbyPreview extends StatefulWidget {
  const HomeNearbyPreview({super.key});

  @override
  State<HomeNearbyPreview> createState() => _HomeNearbyPreviewState();
}

class _HomeNearbyPreviewState extends State<HomeNearbyPreview> {
  final MapController _mapController = MapController();

  StreamSubscription<Position>? _positionSubscription;

  LatLng? _currentLocation;
  bool _isLoading = true;
  String? _locationError;

  @override
  void initState() {
    super.initState();
    _initializeLocation();
  }

  @override
  void dispose() {
    _positionSubscription?.cancel();
    super.dispose();
  }

  Future<void> _initializeLocation() async {
    try {
      final serviceEnabled =
          await Geolocator.isLocationServiceEnabled();

      if (!serviceEnabled) {
        if (!mounted) return;

        setState(() {
          _isLoading = false;
          _locationError = 'Layanan lokasi belum aktif.';
        });

        return;
      }

      var permission = await Geolocator.checkPermission();

      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
      }

      if (permission == LocationPermission.denied ||
          permission == LocationPermission.deniedForever) {
        if (!mounted) return;

        setState(() {
          _isLoading = false;
          _locationError = 'Izin lokasi belum diberikan.';
        });

        return;
      }

      final position = await Geolocator.getCurrentPosition();

      final location = LatLng(
        position.latitude,
        position.longitude,
      );

      if (!mounted) return;

      setState(() {
        _currentLocation = location;
        _isLoading = false;
        _locationError = null;
      });

      _startLocationStream();
    } catch (_) {
      if (!mounted) return;

      setState(() {
        _isLoading = false;
        _locationError = 'Lokasi tidak dapat diperoleh.';
      });
    }
  }

  void _startLocationStream() {
    const locationSettings = LocationSettings(
      accuracy: LocationAccuracy.high,
      distanceFilter: 5,
    );

    _positionSubscription =
        Geolocator.getPositionStream(
      locationSettings: locationSettings,
    ).listen(
      (position) {
        if (!mounted) return;

        final location = LatLng(
          position.latitude,
          position.longitude,
        );

        setState(() {
          _currentLocation = location;
        });
      },
    );
  }

  void _moveToCurrentLocation() {
    final location = _currentLocation;

    if (location == null) {
      _initializeLocation();
      return;
    }

    _mapController.move(
      location,
      15,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        top: AppTheme.spacingXXL,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SectionHeader(
            title: 'Di sekitar kamu',
            actionLabel: 'Lihat semua',
          ),
          const SizedBox(
            height: AppTheme.spacingM,
          ),
          _MapPreview(
            mapController: _mapController,
            currentLocation: _currentLocation,
            isLoading: _isLoading,
            locationError: _locationError,
            onMyLocationTap: _moveToCurrentLocation,
          ),
        ],
      ),
    );
  }
}

class _MapPreview extends StatelessWidget {
  final MapController mapController;
  final LatLng? currentLocation;
  final bool isLoading;
  final String? locationError;
  final VoidCallback onMyLocationTap;

  const _MapPreview({
    required this.mapController,
    required this.currentLocation,
    required this.isLoading,
    required this.locationError,
    required this.onMyLocationTap,
  });

  static const LatLng _fallbackCenter = LatLng(
    -6.2088,
    106.8456,
  );

  @override
  Widget build(BuildContext context) {
    final center = currentLocation ?? _fallbackCenter;

    return ClipRRect(
      borderRadius: BorderRadius.circular(
        AppTheme.radiusLarge,
      ),
      child: SizedBox(
        height: 190,
        child: Stack(
          children: [
            FlutterMap(
              mapController: mapController,
              options: MapOptions(
                initialCenter: center,
                initialZoom: 15,
                interactionOptions: const InteractionOptions(
                  flags: InteractiveFlag.all,
                ),
              ),
              children: [
                TileLayer(
                  urlTemplate:
                      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                  maxZoom: 19,
                  userAgentPackageName: 'id.pethub.app',
                ),
                if (currentLocation != null)
                  MarkerLayer(
                    markers: [
                      Marker(
                        point: currentLocation!,
                        width: 44,
                        height: 44,
                        child: const _UserLocationMarker(),
                      ),
                    ],
                  ),
              ],
            ),

            if (isLoading)
              const Positioned.fill(
                child: Center(
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                  ),
                ),
              ),

            if (locationError != null)
              Positioned(
                left: 12,
                right: 12,
                bottom: 12,
                child: Material(
                  color: Colors.white.withValues(
                    alpha: 0.92,
                  ),
                  borderRadius: BorderRadius.circular(10),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 8,
                    ),
                    child: Row(
                      children: [
                        const Icon(
                          Icons.location_off_outlined,
                          size: 18,
                          color: AppTheme.error,
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            locationError!,
                            style: const TextStyle(
                              fontSize: 11,
                              color: AppTheme.textPrimary,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),

            Positioned(
              top: 10,
              right: 10,
              child: _MapButton(
                icon: Icons.my_location_rounded,
                onTap: onMyLocationTap,
              ),
            ),

            Positioned(
              right: 6,
              bottom: 4,
              child: Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 4,
                  vertical: 2,
                ),
                color: Colors.white.withValues(
                  alpha: 0.78,
                ),
                child: const Text(
                  '© OpenStreetMap contributors',
                  style: TextStyle(
                    fontSize: 7,
                    color: AppTheme.textSecondary,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _UserLocationMarker extends StatelessWidget {
  const _UserLocationMarker();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 22,
        height: 22,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: Colors.white,
          border: Border.all(
            color: AppTheme.info,
            width: 3,
          ),
          boxShadow: const [
            BoxShadow(
              color: Color(0x33000000),
              blurRadius: 5,
              offset: Offset(0, 2),
            ),
          ],
        ),
      ),
    );
  }
}

class _MapButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;

  const _MapButton({
    required this.icon,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      borderRadius: BorderRadius.circular(8),
      elevation: 2,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: const SizedBox(
          width: 34,
          height: 34,
          child: Icon(
            Icons.my_location_rounded,
            size: 20,
            color: AppTheme.textPrimary,
          ),
        ),
      ),
    );
  }
}