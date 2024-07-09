import { SnapchatDetails } from './snapchatdetails.model';

export interface User {
  id: string;
  uid: string;
  username: string;
  snapchat_details: SnapchatDetails;
  phone_number: string;
  bio: string;
  display_picture: string;
  gender: string;
  dob: string;
  deleted: boolean;
  location: Location;
  access_token: string;
  created_at: number;
  updated_at: number;
}
