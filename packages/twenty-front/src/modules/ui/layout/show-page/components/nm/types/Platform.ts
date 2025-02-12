export type PlatformType = 'social_media' | 'real_estate';

export type Platform = {
  id: 'Instagram' | 'Google Ads' | 'Swiss Marketplace Group (SMG)' | 'Newhome';
  type: PlatformType;
  name: string;
  description: string;
  isConnected?: boolean;
  accountName?: string;
  isNew?: boolean;
};

export const PLATFORMS: Platform[] = [
  {
    id: 'Instagram',
    type: 'social_media',
    name: 'Instagram',
    description:
      'Share engaging property videos and photos to your Instagram feed and stories',
    isConnected: true,
    accountName: '@nester.mind',
    isNew: true,
  },
  {
    id: 'Google Ads',
    type: 'social_media',
    name: 'Google Ads',
    description: 'Create targeted property campaigns to reach potential buyers',
  },
  {
    id: 'Swiss Marketplace Group (SMG)',
    type: 'real_estate',
    name: 'Swiss Marketplace Group',
    description:
      'This includes the following platforms: ImmoScout24, Homegate, and more.',
  },
  {
    id: 'Newhome',
    type: 'real_estate',
    name: 'Newhome',
    description: 'List your property conveniently to newhome.ch.',
  },
];
