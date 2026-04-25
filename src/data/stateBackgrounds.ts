import uttarPradesh from "@/assets/states/uttar-pradesh.jpg";
import rajasthan from "@/assets/states/rajasthan.jpg";
import kerala from "@/assets/states/kerala.jpg";
import tamilNadu from "@/assets/states/tamil-nadu.jpg";
import maharashtra from "@/assets/states/maharashtra.jpg";
import punjab from "@/assets/states/punjab.jpg";
import goa from "@/assets/states/goa.jpg";
import karnataka from "@/assets/states/karnataka.jpg";
import gujarat from "@/assets/states/gujarat.jpg";
import westBengal from "@/assets/states/west-bengal.jpg";
import delhi from "@/assets/states/delhi.jpg";
import himachalPradesh from "@/assets/states/himachal-pradesh.jpg";
import odisha from "@/assets/states/odisha.jpg";
import assam from "@/assets/states/assam.jpg";
import madhyaPradesh from "@/assets/states/madhya-pradesh.jpg";
import bihar from "@/assets/states/bihar.jpg";
import telangana from "@/assets/states/telangana.jpg";
import uttarakhand from "@/assets/states/uttarakhand.jpg";
import andhraPradesh from "@/assets/states/andhra-pradesh.jpg";
import arunachalPradesh from "@/assets/states/arunachal-pradesh.jpg";
import chhattisgarh from "@/assets/states/chhattisgarh.jpg";
import haryana from "@/assets/states/haryana.jpg";
import jharkhand from "@/assets/states/jharkhand.jpg";
import manipur from "@/assets/states/manipur.png";
import meghalaya from "@/assets/states/meghalaya.png";
import mizoram from "@/assets/states/mizoram.png";
import nagaland from "@/assets/states/nagaland.png";
import sikkim from "@/assets/states/sikkim.png";
import defaultBg from "@/assets/states/default.jpg";

export const stateBackgrounds: Record<string, string> = {
  "Uttar Pradesh": uttarPradesh,
  "Rajasthan": rajasthan,
  "Kerala": kerala,
  "Tamil Nadu": tamilNadu,
  "Maharashtra": maharashtra,
  "Punjab": punjab,
  "Goa": goa,
  "Karnataka": karnataka,
  "Gujarat": gujarat,
  "West Bengal": westBengal,
  "Delhi": delhi,
  "Himachal Pradesh": himachalPradesh,
  "Odisha": odisha,
  "Assam": assam,
  "Madhya Pradesh": madhyaPradesh,
  "Bihar": bihar,
  "Telangana": telangana,
  "Uttarakhand": uttarakhand,
  "Andhra Pradesh": andhraPradesh,
  "Arunachal Pradesh": arunachalPradesh,
  "Chhattisgarh": chhattisgarh,
  "Haryana": haryana,
  "Jharkhand": jharkhand,
  "Manipur": manipur,
  "Meghalaya": meghalaya,
  "Mizoram": mizoram,
  "Nagaland": nagaland,
  "Sikkim": sikkim,
};

export const getStateBackground = (stateName: string): string => {
  return stateBackgrounds[stateName] || defaultBg;
};
