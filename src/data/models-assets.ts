import type { WebflowReplacement } from '../utils/webflow-content';

const original = (file: string) => `/static/picture/${file}`;

/**
 * Editor-friendly media locations for the Models listing. The original
 * Webflow files remain available under public/static/picture as a fallback.
 */
export const modelsAssets = {
  logo: '/assets/shared/brand-logo.svg',
  arrowRight: '/assets/shared/icons/arrow-right.svg',
  arrowDown: '/assets/shared/icons/arrow-down.svg',
  filterArrow: '/assets/models/icons/filter-arrow.svg',
  brands: {
    luxora: '/assets/brands/luxora.svg',
    velox: '/assets/brands/velox.svg',
    aurion: '/assets/brands/aurion.svg',
  },
  cards: {
    raptHorizon: '/assets/models/rapt-horizon/card.webp',
    velocitCrest: '/assets/models/velocit-crest/card.webp',
    xplorerGlide: '/assets/models/xplorer-glide/card.webp',
    cestTunder: '/assets/models/cest-tunder/card.webp',
    glideVortex: '/assets/models/glide-vortex/card.webp',
    sumitSenity: '/assets/models/sumit-senity/card.webp',
    senityPulse: '/assets/models/senity-pulse/card.webp',
  },
  shared: {
    gallery: {
      image1: '/assets/models/shared/gallery/image-1.webp',
      image2: '/assets/models/shared/gallery/image-2.webp',
      image3: '/assets/models/shared/gallery/image-3.webp',
    },
    icons: {
      images: '/assets/models/shared/icons/images.svg',
      fuel: '/assets/models/shared/icons/fuel.svg',
      capacity: '/assets/models/shared/icons/capacity.svg',
      vehicle: '/assets/models/shared/icons/vehicle.svg',
      calendar: '/assets/models/shared/icons/calendar.svg',
      baggage: '/assets/models/shared/icons/baggage.svg',
      seat: '/assets/models/shared/icons/seat.svg',
      gps: '/assets/models/shared/icons/gps.svg',
      camera: '/assets/models/shared/icons/camera.svg',
      bluetooth: '/assets/models/shared/icons/bluetooth.svg',
      roof: '/assets/models/shared/icons/roof.svg',
      headlights: '/assets/models/shared/icons/headlights.svg',
      speaker: '/assets/models/shared/icons/speaker.svg',
    },
  },
} as const;

export const modelsAssetReplacements: readonly WebflowReplacement[] = [
  [original('6863a7d749380244400cadf0_ec84ea29b2cc7723b4b9b2449bd3b59c_logo.svg'), modelsAssets.logo],
  [original('6864d28d6d224cfc617cfc39_0b76b173af6046e3baff3b231d198b2e_arrow-right-icon.svg'), modelsAssets.arrowRight],
  [original('68695011fff14c231d733695_18e4deb9ce7150d6021fead5b7f630a7_arrow-bottom-icon.svg'), modelsAssets.arrowDown],
  [original('6887617f98a5ae9ff07b5089_ace704766c463e388ab649cac1903b22_arrow-bottom-icon-2.svg'), modelsAssets.filterArrow],
  [original('6887b4e2f16c8bb12bc8b52d_d19496b54cbfe5623d8b314bea1c2ec2_arrow-left-icon.svg'), '/assets/articles/icons/arrow-left.svg'],
  [original('688743c1963c97bb61db2281_luxora.svg'), modelsAssets.brands.luxora],
  [original('688743ce33633af956b114dd_velox.svg'), modelsAssets.brands.velox],
  [original('688743d9b6babee061ccd02f_aurion.svg'), modelsAssets.brands.aurion],
  [original('686f7eca3b34d2e8df938a4b_raptor-horizon.webp'), modelsAssets.cards.raptHorizon],
  [original('686f7df608019c9b041ab7db_velocity-crest.webp'), modelsAssets.cards.velocitCrest],
  [original('686f7c9896946e6903f1ce81_xplorer-glide.webp'), modelsAssets.cards.xplorerGlide],
  [original('686f7b026be181cd253bea32_crest-thunder.webp'), modelsAssets.cards.cestTunder],
  [original('686f7a28adef37939d8c0ebc_glide-vortex.webp'), modelsAssets.cards.glideVortex],
  [original('686f795756461966fea95229_summit-serenity.webp'), modelsAssets.cards.sumitSenity],
  [original('686f74e7aaf313929445701c_serenity-pulse.webp'), modelsAssets.cards.senityPulse],
];

export const modelDetailSharedAssetReplacements: readonly WebflowReplacement[] = [
  ...modelsAssetReplacements,
  [original('688cac81da5898f583b67e2c_fa00a426dc7adfbfe31ac4bcb28480f8_images-icon.svg'), modelsAssets.shared.icons.images],
  [original('688cd98285e9b50d64ca139b_fuel-icon.svg'), modelsAssets.shared.icons.fuel],
  [original('688cd9830fcbb0efc216b196_capacity-icon.svg'), modelsAssets.shared.icons.capacity],
  [original('688cd9832016ce0e1f0d572a_car-icon-3.svg'), modelsAssets.shared.icons.vehicle],
  [original('688cd9834416b468314e30e0_calendar-icon-2.svg'), modelsAssets.shared.icons.calendar],
  [original('688cd9834f70b6cc365ae4e2_baggage-icon.svg'), modelsAssets.shared.icons.baggage],
  [original('688f2f17a7fce6edf619bde5_seat-icon.svg'), modelsAssets.shared.icons.seat],
  [original('688f2f239b2a5c926cf3ccec_gps-icon.svg'), modelsAssets.shared.icons.gps],
  [original('688f2f2bd641b90f257a7f59_camera-icon.svg'), modelsAssets.shared.icons.camera],
  [original('688f2f34c9436b63c78784f3_bluetooth-icon.svg'), modelsAssets.shared.icons.bluetooth],
  [original('688f2f3e3e0f3cbdd794979b_roof-icon.svg'), modelsAssets.shared.icons.roof],
  [original('688f2f4b07927d7cacf93595_headlights-icon.svg'), modelsAssets.shared.icons.headlights],
  [original('688f309a8f1be3bee9750f36_speaker-icon.svg'), modelsAssets.shared.icons.speaker],
];
