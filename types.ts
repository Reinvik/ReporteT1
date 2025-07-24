
export enum DeliveryStatus {
  Completo = 'Completo',
  Faltante = 'Faltante',
  Sobrante = 'Sobrante'
}

export interface Delivery {
  id: string;
  zonal: string;
  sku: string;
  quantity: number;
  receptionDate: string;
  status: DeliveryStatus;
  invoice: string;
}
