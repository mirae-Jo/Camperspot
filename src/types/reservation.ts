export type ReservationInfo = {
  people: number;
  check_in_date: string;
  check_out_date: string;
  fee: number;
  camp_area: {
    id: string;
    name: string;
    campName: {
      name: string;
    } | null;
  } | null;
}[];
