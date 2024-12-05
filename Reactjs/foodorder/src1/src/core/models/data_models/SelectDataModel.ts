interface Option {
  value: string;
  label: string;
}

export const partnerOption = (newFormData: any): Option[] =>
  newFormData?.partners?.map((value: string) => ({
    value,
    label: value,
  }));
export const installerOption = (newFormData: any): Option[] =>
  newFormData?.installers?.map((value: string) => ({
    value,
    label: value,
  }));
export const salesPriceOption = (newFormData: any): Option[] =>
  newFormData?.sale_price?.map((value: string) => ({
    value,
    label: value,
  }));
export const repTypeOption = (newFormData: any): Option[] =>
  newFormData?.rep_type?.map((value: string) => ({
    value,
    label: value,
  }));

export const stateOption = (newFormData: any): Option[] =>
  newFormData?.states?.map((value: string) => ({
    value,
    label: value,
  }));

export const availableStates = (newFormData: any): Option[] =>
  newFormData?.available_states?.map((value: string) =>
    value === '' ? { value: '', label: '-' } : { value, label: value }
  ) || [];
export const subDealerOption = (newFormData: any): Option[] =>
  newFormData?.sub_dealer?.map((value: string) => ({
    value,
    label: value,
  }));
export const dealerOption = (newFormData: any): Option[] =>
  newFormData?.dealer?.map((value: string) => ({
    value,
    label: value,
  }));
export const dealerNameOption = (newFormData: any): Option[] =>
  newFormData?.dealer_name?.map((value: string) => ({
    value,
    label: value,
  }));
export const adderTypeOption = (newFormData: any): Option[] =>
  newFormData?.adder_type?.map((value: string) => ({
    value,
    label: value,
  }));
export const priceTypeOption = (newFormData: any): Option[] =>
  newFormData?.price_type?.map((value: string) => ({
    value,
    label: value,
  }));
export const sourceOption = (newFormData: any): Option[] =>
  newFormData?.source?.map((value: string) => ({
    value,
    label: value,
  }));
export const dbaOption = (newFormData: any): Option[] =>
  newFormData?.dba?.map((value: string) => ({
    value,
    label: value,
  }));
export const chg_dlrOption = (newFormData: any): Option[] =>
  newFormData?.chg_dlr?.map((value: string | Number) => ({
    value,
    label: value,
  }));
export const dealertierOption = (newFormData: any): Option[] =>
  newFormData?.tier?.map((value: string) => ({
    value,
    label: value,
  }));
export const salesTypeOption = (newFormData: any): Option[] =>
  newFormData?.sale_type?.map((value: string) => ({
    value,
    label: value,
  }));

export const teamsOption = (newFormData: any): Option[] =>
  newFormData?.teams?.map((value: string) => ({
    value,
    label: value,
  }));
export const oweCostOption = (newFormData: any): Option[] =>
  newFormData?.owe_cost?.map((value: string) => ({
    value,
    label: value,
  }));

export const loanOption = (newFormData: any): Option[] =>
  newFormData?.loan_type?.map((value: string) => ({
    value,
    label: value,
  }));
