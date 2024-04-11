import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';

// https://api.worldbank.org/v2/country/${countryName}?format=json

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  errorMessage: string = '';

  constructor(private http: HttpClient) { 
    
  }

  getCountryName($event: any) {

    // This function pulls in the mouse event, parses the country name from the SVG path attributes and returns it as a string.

    let countryElement = $event.target;
    let countryName: string = countryElement.getAttribute('name');
    if (countryName === null || countryName === undefined) {
        countryName = countryElement.getAttribute('class').toLowerCase();
    } else {
        countryName = countryName.toLowerCase();
    }
    return countryName;
    
  }

  fetchCountryData(countryName: string) {

    // This function will take in the country name and use that to search the "countryCodes" object and find its Alpha-3 code. It then uses that alpha 3 code to query the worldbank api and returns the query as an observable.

    this.errorMessage = '';
    let countryCodes = [
      {
        "name": "Afghanistan",
        "Alpha-2 code": "AF",
        "alpha3": "AFG",
        "Numeric code": "004",
        "ISO 3166-2": "ISO 3166-2:AF"
      },
      {
        "name": "Åland Islands",
        "Alpha-2 code": "AX",
        "alpha3": "ALA",
        "Numeric code": 248,
        "ISO 3166-2": "ISO 3166-2:AX"
      },
      {
        "name": "Albania",
        "Alpha-2 code": "AL",
        "alpha3": "ALB",
        "Numeric code": "008",
        "ISO 3166-2": "ISO 3166-2:AL"
      },
      {
        "name": "Algeria",
        "Alpha-2 code": "DZ",
        "alpha3": "DZA",
        "Numeric code": "012",
        "ISO 3166-2": "ISO 3166-2:DZ"
      },
      {
        "name": "American Samoa",
        "Alpha-2 code": "AS",
        "alpha3": "ASM",
        "Numeric code": "016",
        "ISO 3166-2": "ISO 3166-2:AS"
      },
      {
        "name": "Andorra",
        "Alpha-2 code": "AD",
        "alpha3": "AND",
        "Numeric code": "020",
        "ISO 3166-2": "ISO 3166-2:AD"
      },
      {
        "name": "Angola",
        "Alpha-2 code": "AO",
        "alpha3": "AGO",
        "Numeric code": "024",
        "ISO 3166-2": "ISO 3166-2:AO"
      },
      {
        "name": "Anguilla",
        "Alpha-2 code": "AI",
        "alpha3": "AIA",
        "Numeric code": 660,
        "ISO 3166-2": "ISO 3166-2:AI"
      },
      {
        "name": "Antarctica",
        "Alpha-2 code": "AQ",
        "alpha3": "ATA",
        "Numeric code": "010",
        "ISO 3166-2": "ISO 3166-2:AQ"
      },
      {
        "name": "Antigua and Barbuda",
        "Alpha-2 code": "AG",
        "alpha3": "ATG",
        "Numeric code": "028",
        "ISO 3166-2": "ISO 3166-2:AG"
      },
      {
        "name": "Argentina",
        "Alpha-2 code": "AR",
        "alpha3": "ARG",
        "Numeric code": "032",
        "ISO 3166-2": "ISO 3166-2:AR"
      },
      {
        "name": "Armenia",
        "Alpha-2 code": "AM",
        "alpha3": "ARM",
        "Numeric code": "051",
        "ISO 3166-2": "ISO 3166-2:AM"
      },
      {
        "name": "Aruba",
        "Alpha-2 code": "AW",
        "alpha3": "ABW",
        "Numeric code": 533,
        "ISO 3166-2": "ISO 3166-2:AW"
      },
      {
        "name": "Australia",
        "Alpha-2 code": "AU",
        "alpha3": "AUS",
        "Numeric code": "036",
        "ISO 3166-2": "ISO 3166-2:AU"
      },
      {
        "name": "Austria",
        "Alpha-2 code": "AT",
        "alpha3": "AUT",
        "Numeric code": "040",
        "ISO 3166-2": "ISO 3166-2:AT"
      },
      {
        "name": "Azerbaijan",
        "Alpha-2 code": "AZ",
        "alpha3": "AZE",
        "Numeric code": "031",
        "ISO 3166-2": "ISO 3166-2:AZ"
      },
      {
        "name": "Bahamas",
        "Alpha-2 code": "BS",
        "alpha3": "BHS",
        "Numeric code": "044",
        "ISO 3166-2": "ISO 3166-2:BS"
      },
      {
        "name": "Bahrain",
        "Alpha-2 code": "BH",
        "alpha3": "BHR",
        "Numeric code": "048",
        "ISO 3166-2": "ISO 3166-2:BH"
      },
      {
        "name": "Bangladesh",
        "Alpha-2 code": "BD",
        "alpha3": "BGD",
        "Numeric code": "050",
        "ISO 3166-2": "ISO 3166-2:BD"
      },
      {
        "name": "Barbados",
        "Alpha-2 code": "BB",
        "alpha3": "BRB",
        "Numeric code": "052",
        "ISO 3166-2": "ISO 3166-2:BB"
      },
      {
        "name": "Belarus",
        "Alpha-2 code": "BY",
        "alpha3": "BLR",
        "Numeric code": 112,
        "ISO 3166-2": "ISO 3166-2:BY"
      },
      {
        "name": "Belgium",
        "Alpha-2 code": "BE",
        "alpha3": "BEL",
        "Numeric code": "056",
        "ISO 3166-2": "ISO 3166-2:BE"
      },
      {
        "name": "Belize",
        "Alpha-2 code": "BZ",
        "alpha3": "BLZ",
        "Numeric code": "084",
        "ISO 3166-2": "ISO 3166-2:BZ"
      },
      {
        "name": "Benin",
        "Alpha-2 code": "BJ",
        "alpha3": "BEN",
        "Numeric code": 204,
        "ISO 3166-2": "ISO 3166-2:BJ"
      },
      {
        "name": "Bermuda",
        "Alpha-2 code": "BM",
        "alpha3": "BMU",
        "Numeric code": "060",
        "ISO 3166-2": "ISO 3166-2:BM"
      },
      {
        "name": "Bhutan",
        "Alpha-2 code": "BT",
        "alpha3": "BTN",
        "Numeric code": "064",
        "ISO 3166-2": "ISO 3166-2:BT"
      },
      {
        "name": "Bolivia, Plurinational State of",
        "Alpha-2 code": "BO",
        "alpha3": "BOL",
        "Numeric code": "068",
        "ISO 3166-2": "ISO 3166-2:BO"
      },
      {
        "name": "Bosnia and Herzegovina",
        "Alpha-2 code": "BA",
        "alpha3": "BIH",
        "Numeric code": "070",
        "ISO 3166-2": "ISO 3166-2:BA"
      },
      {
        "name": "Botswana",
        "Alpha-2 code": "BW",
        "alpha3": "BWA",
        "Numeric code": "072",
        "ISO 3166-2": "ISO 3166-2:BW"
      },
      {
        "name": "Bouvet Island",
        "Alpha-2 code": "BV",
        "alpha3": "BVT",
        "Numeric code": "074",
        "ISO 3166-2": "ISO 3166-2:BV"
      },
      {
        "name": "Brazil",
        "Alpha-2 code": "BR",
        "alpha3": "BRA",
        "Numeric code": "076",
        "ISO 3166-2": "ISO 3166-2:BR"
      },
      {
        "name": "British Indian Ocean Territory",
        "Alpha-2 code": "IO",
        "alpha3": "IOT",
        "Numeric code": "086",
        "ISO 3166-2": "ISO 3166-2:IO"
      },
      {
        "name": "Brunei Darussalam",
        "Alpha-2 code": "BN",
        "alpha3": "BRN",
        "Numeric code": "096",
        "ISO 3166-2": "ISO 3166-2:BN"
      },
      {
        "name": "Bulgaria",
        "Alpha-2 code": "BG",
        "alpha3": "BGR",
        "Numeric code": 100,
        "ISO 3166-2": "ISO 3166-2:BG"
      },
      {
        "name": "Burkina Faso",
        "Alpha-2 code": "BF",
        "alpha3": "BFA",
        "Numeric code": 854,
        "ISO 3166-2": "ISO 3166-2:BF"
      },
      {
        "name": "Burundi",
        "Alpha-2 code": "BI",
        "alpha3": "BDI",
        "Numeric code": 108,
        "ISO 3166-2": "ISO 3166-2:BI"
      },
      {
        "name": "Cambodia",
        "Alpha-2 code": "KH",
        "alpha3": "KHM",
        "Numeric code": 116,
        "ISO 3166-2": "ISO 3166-2:KH"
      },
      {
        "name": "Cameroon",
        "Alpha-2 code": "CM",
        "alpha3": "CMR",
        "Numeric code": 120,
        "ISO 3166-2": "ISO 3166-2:CM"
      },
      {
        "name": "Canada",
        "Alpha-2 code": "CA",
        "alpha3": "CAN",
        "Numeric code": 124,
        "ISO 3166-2": "ISO 3166-2:CA"
      },
      {
        "name": "Canary Islands (Spain)",
        "Alpha-2 code": "IC",
        "alpha3": "IC",
        "Numeric code": '',
        "ISO 3166-2": "ISO 3166-2:IC"
      },
      {
        "name": "Cape Verde",
        "Alpha-2 code": "CV",
        "alpha3": "CPV",
        "Numeric code": 132,
        "ISO 3166-2": "ISO 3166-2:CV"
      },
      {
        "name": "Cayman Islands",
        "Alpha-2 code": "KY",
        "alpha3": "CYM",
        "Numeric code": 136,
        "ISO 3166-2": "ISO 3166-2:KY"
      },
      {
        "name": "Central African Republic",
        "Alpha-2 code": "CF",
        "alpha3": "CAF",
        "Numeric code": 140,
        "ISO 3166-2": "ISO 3166-2:CF"
      },
      {
        "name": "Chad",
        "Alpha-2 code": "TD",
        "alpha3": "TCD",
        "Numeric code": 148,
        "ISO 3166-2": "ISO 3166-2:TD"
      },
      {
        "name": "Chile",
        "Alpha-2 code": "CL",
        "alpha3": "CHL",
        "Numeric code": 152,
        "ISO 3166-2": "ISO 3166-2:CL"
      },
      {
        "name": "China",
        "Alpha-2 code": "CN",
        "alpha3": "CHN",
        "Numeric code": 156,
        "ISO 3166-2": "ISO 3166-2:CN"
      },
      {
        "name": "Christmas Island",
        "Alpha-2 code": "CX",
        "alpha3": "CXR",
        "Numeric code": 162,
        "ISO 3166-2": "ISO 3166-2:CX"
      },
      {
        "name": "Cocos (Keeling) Islands",
        "Alpha-2 code": "CC",
        "alpha3": "CCK",
        "Numeric code": 166,
        "ISO 3166-2": "ISO 3166-2:CC"
      },
      {
        "name": "Colombia",
        "Alpha-2 code": "CO",
        "alpha3": "COL",
        "Numeric code": 170,
        "ISO 3166-2": "ISO 3166-2:CO"
      },
      {
        "name": "Comoros",
        "Alpha-2 code": "KM",
        "alpha3": "COM",
        "Numeric code": 174,
        "ISO 3166-2": "ISO 3166-2:KM"
      },
      {
        "name": "Congo",
        "Alpha-2 code": "CG",
        "alpha3": "COG",
        "Numeric code": 178,
        "ISO 3166-2": "ISO 3166-2:CG"
      },
      {
        "name": "Congo, the Democratic Republic of the",
        "Alpha-2 code": "CD",
        "alpha3": "COD",
        "Numeric code": 180,
        "ISO 3166-2": "ISO 3166-2:CD"
      },
      {
        "name": "Cook Islands",
        "Alpha-2 code": "CK",
        "alpha3": "COK",
        "Numeric code": 184,
        "ISO 3166-2": "ISO 3166-2:CK"
      },
      {
        "name": "Costa Rica",
        "Alpha-2 code": "CR",
        "alpha3": "CRI",
        "Numeric code": 188,
        "ISO 3166-2": "ISO 3166-2:CR"
      },
      {
        "name": "Côte d'Ivoire",
        "Alpha-2 code": "CI",
        "alpha3": "CIV",
        "Numeric code": 384,
        "ISO 3166-2": "ISO 3166-2:CI"
      },
      {
        "name": "Croatia",
        "Alpha-2 code": "HR",
        "alpha3": "HRV",
        "Numeric code": 191,
        "ISO 3166-2": "ISO 3166-2:HR"
      },
      {
        "name": "Cuba",
        "Alpha-2 code": "CU",
        "alpha3": "CUB",
        "Numeric code": 192,
        "ISO 3166-2": "ISO 3166-2:CU"
      },
      {
        "name": "Cyprus",
        "Alpha-2 code": "CY",
        "alpha3": "CYP",
        "Numeric code": 196,
        "ISO 3166-2": "ISO 3166-2:CY"
      },
      {
        "name": "Czech Republic",
        "Alpha-2 code": "CZ",
        "alpha3": "CZE",
        "Numeric code": 203,
        "ISO 3166-2": "ISO 3166-2:CZ"
      },
      {
        "name": "Denmark",
        "Alpha-2 code": "DK",
        "alpha3": "DNK",
        "Numeric code": 208,
        "ISO 3166-2": "ISO 3166-2:DK"
      },
      {
        "name": "Djibouti",
        "Alpha-2 code": "DJ",
        "alpha3": "DJI",
        "Numeric code": 262,
        "ISO 3166-2": "ISO 3166-2:DJ"
      },
      {
        "name": "Dominica",
        "Alpha-2 code": "DM",
        "alpha3": "DMA",
        "Numeric code": 212,
        "ISO 3166-2": "ISO 3166-2:DM"
      },
      {
        "name": "Dominican Republic",
        "Alpha-2 code": "DO",
        "alpha3": "DOM",
        "Numeric code": 214,
        "ISO 3166-2": "ISO 3166-2:DO"
      },
      {
        "name": "Ecuador",
        "Alpha-2 code": "EC",
        "alpha3": "ECU",
        "Numeric code": 218,
        "ISO 3166-2": "ISO 3166-2:EC"
      },
      {
        "name": "Egypt",
        "Alpha-2 code": "EG",
        "alpha3": "EGY",
        "Numeric code": 818,
        "ISO 3166-2": "ISO 3166-2:EG"
      },
      {
        "name": "El Salvador",
        "Alpha-2 code": "SV",
        "alpha3": "SLV",
        "Numeric code": 222,
        "ISO 3166-2": "ISO 3166-2:SV"
      },
      {
        "name": "Equatorial Guinea",
        "Alpha-2 code": "GQ",
        "alpha3": "GNQ",
        "Numeric code": 226,
        "ISO 3166-2": "ISO 3166-2:GQ"
      },
      {
        "name": "Eritrea",
        "Alpha-2 code": "ER",
        "alpha3": "ERI",
        "Numeric code": 232,
        "ISO 3166-2": "ISO 3166-2:ER"
      },
      {
        "name": "Estonia",
        "Alpha-2 code": "EE",
        "alpha3": "EST",
        "Numeric code": 233,
        "ISO 3166-2": "ISO 3166-2:EE"
      },
      {
        "name": "Ethiopia",
        "Alpha-2 code": "ET",
        "alpha3": "ETH",
        "Numeric code": 231,
        "ISO 3166-2": "ISO 3166-2:ET"
      },
      {
        "name": "Falkland Islands (Malvinas)",
        "Alpha-2 code": "FK",
        "alpha3": "FLK",
        "Numeric code": 238,
        "ISO 3166-2": "ISO 3166-2:FK"
      },
      {
        "name": "Faroe Islands",
        "Alpha-2 code": "FO",
        "alpha3": "FRO",
        "Numeric code": 234,
        "ISO 3166-2": "ISO 3166-2:FO"
      },
      {
        "name": "Fiji",
        "Alpha-2 code": "FJ",
        "alpha3": "FJI",
        "Numeric code": 242,
        "ISO 3166-2": "ISO 3166-2:FJ"
      },
      {
        "name": "Finland",
        "Alpha-2 code": "FI",
        "alpha3": "FIN",
        "Numeric code": 246,
        "ISO 3166-2": "ISO 3166-2:FI"
      },
      {
        "name": "France",
        "Alpha-2 code": "FR",
        "alpha3": "FRA",
        "Numeric code": 250,
        "ISO 3166-2": "ISO 3166-2:FR"
      },
      {
        "name": "French Guiana",
        "Alpha-2 code": "GF",
        "alpha3": "GUF",
        "Numeric code": 254,
        "ISO 3166-2": "ISO 3166-2:GF"
      },
      {
        "name": "French Polynesia",
        "Alpha-2 code": "PF",
        "alpha3": "PYF",
        "Numeric code": 258,
        "ISO 3166-2": "ISO 3166-2:PF"
      },
      {
        "name": "French Southern Territories",
        "Alpha-2 code": "TF",
        "alpha3": "ATF",
        "Numeric code": 260,
        "ISO 3166-2": "ISO 3166-2:TF"
      },
      {
        "name": "Gabon",
        "Alpha-2 code": "GA",
        "alpha3": "GAB",
        "Numeric code": 266,
        "ISO 3166-2": "ISO 3166-2:GA"
      },
      {
        "name": "Gambia",
        "Alpha-2 code": "GM",
        "alpha3": "GMB",
        "Numeric code": 270,
        "ISO 3166-2": "ISO 3166-2:GM"
      },
      {
        "name": "Georgia",
        "Alpha-2 code": "GE",
        "alpha3": "GEO",
        "Numeric code": 268,
        "ISO 3166-2": "ISO 3166-2:GE"
      },
      {
        "name": "Germany",
        "Alpha-2 code": "DE",
        "alpha3": "DEU",
        "Numeric code": 276,
        "ISO 3166-2": "ISO 3166-2:DE"
      },
      {
        "name": "Ghana",
        "Alpha-2 code": "GH",
        "alpha3": "GHA",
        "Numeric code": 288,
        "ISO 3166-2": "ISO 3166-2:GH"
      },
      {
        "name": "Gibraltar",
        "Alpha-2 code": "GI",
        "alpha3": "GIB",
        "Numeric code": 292,
        "ISO 3166-2": "ISO 3166-2:GI"
      },
      {
        "name": "Greece",
        "Alpha-2 code": "GR",
        "alpha3": "GRC",
        "Numeric code": 300,
        "ISO 3166-2": "ISO 3166-2:GR"
      },
      {
        "name": "Greenland",
        "Alpha-2 code": "GL",
        "alpha3": "GRL",
        "Numeric code": 304,
        "ISO 3166-2": "ISO 3166-2:GL"
      },
      {
        "name": "Grenada",
        "Alpha-2 code": "GD",
        "alpha3": "GRD",
        "Numeric code": 308,
        "ISO 3166-2": "ISO 3166-2:GD"
      },
      {
        "name": "Guadeloupe",
        "Alpha-2 code": "GP",
        "alpha3": "GLP",
        "Numeric code": 312,
        "ISO 3166-2": "ISO 3166-2:GP"
      },
      {
        "name": "Guam",
        "Alpha-2 code": "GU",
        "alpha3": "GUM",
        "Numeric code": 316,
        "ISO 3166-2": "ISO 3166-2:GU"
      },
      {
        "name": "Guatemala",
        "Alpha-2 code": "GT",
        "alpha3": "GTM",
        "Numeric code": 320,
        "ISO 3166-2": "ISO 3166-2:GT"
      },
      {
        "name": "Guernsey",
        "Alpha-2 code": "GG",
        "alpha3": "GGY",
        "Numeric code": 831,
        "ISO 3166-2": "ISO 3166-2:GG"
      },
      {
        "name": "Guinea",
        "Alpha-2 code": "GN",
        "alpha3": "GIN",
        "Numeric code": 324,
        "ISO 3166-2": "ISO 3166-2:GN"
      },
      {
        "name": "Guinea-Bissau",
        "Alpha-2 code": "GW",
        "alpha3": "GNB",
        "Numeric code": 624,
        "ISO 3166-2": "ISO 3166-2:GW"
      },
      {
        "name": "Guyana",
        "Alpha-2 code": "GY",
        "alpha3": "GUY",
        "Numeric code": 328,
        "ISO 3166-2": "ISO 3166-2:GY"
      },
      {
        "name": "Haiti",
        "Alpha-2 code": "HT",
        "alpha3": "HTI",
        "Numeric code": 332,
        "ISO 3166-2": "ISO 3166-2:HT"
      },
      {
        "name": "Heard Island and McDonald Islands",
        "Alpha-2 code": "HM",
        "alpha3": "HMD",
        "Numeric code": 334,
        "ISO 3166-2": "ISO 3166-2:HM"
      },
      {
        "name": "Holy See (Vatican City State)",
        "Alpha-2 code": "VA",
        "alpha3": "VAT",
        "Numeric code": 336,
        "ISO 3166-2": "ISO 3166-2:VA"
      },
      {
        "name": "Honduras",
        "Alpha-2 code": "HN",
        "alpha3": "HND",
        "Numeric code": 340,
        "ISO 3166-2": "ISO 3166-2:HN"
      },
      {
        "name": "Hong Kong",
        "Alpha-2 code": "HK",
        "alpha3": "HKG",
        "Numeric code": 344,
        "ISO 3166-2": "ISO 3166-2:HK"
      },
      {
        "name": "Hungary",
        "Alpha-2 code": "HU",
        "alpha3": "HUN",
        "Numeric code": 348,
        "ISO 3166-2": "ISO 3166-2:HU"
      },
      {
        "name": "Iceland",
        "Alpha-2 code": "IS",
        "alpha3": "ISL",
        "Numeric code": 352,
        "ISO 3166-2": "ISO 3166-2:IS"
      },
      {
        "name": "India",
        "Alpha-2 code": "IN",
        "alpha3": "IND",
        "Numeric code": 356,
        "ISO 3166-2": "ISO 3166-2:IN"
      },
      {
        "name": "Indonesia",
        "Alpha-2 code": "ID",
        "alpha3": "IDN",
        "Numeric code": 360,
        "ISO 3166-2": "ISO 3166-2:ID"
      },
      {
        "name": "Iran, Islamic Republic of",
        "Alpha-2 code": "IR",
        "alpha3": "IRN",
        "Numeric code": 364,
        "ISO 3166-2": "ISO 3166-2:IR"
      },
      {
        "name": "Iraq",
        "Alpha-2 code": "IQ",
        "alpha3": "IRQ",
        "Numeric code": 368,
        "ISO 3166-2": "ISO 3166-2:IQ"
      },
      {
        "name": "Ireland",
        "Alpha-2 code": "IE",
        "alpha3": "IRL",
        "Numeric code": 372,
        "ISO 3166-2": "ISO 3166-2:IE"
      },
      {
        "name": "Isle of Man",
        "Alpha-2 code": "IM",
        "alpha3": "IMN",
        "Numeric code": 833,
        "ISO 3166-2": "ISO 3166-2:IM"
      },
      {
        "name": "Israel",
        "Alpha-2 code": "IL",
        "alpha3": "ISR",
        "Numeric code": 376,
        "ISO 3166-2": "ISO 3166-2:IL"
      },
      {
        "name": "Italy",
        "Alpha-2 code": "IT",
        "alpha3": "ITA",
        "Numeric code": 380,
        "ISO 3166-2": "ISO 3166-2:IT"
      },
      {
        "name": "Jamaica",
        "Alpha-2 code": "JM",
        "alpha3": "JAM",
        "Numeric code": 388,
        "ISO 3166-2": "ISO 3166-2:JM"
      },
      {
        "name": "Japan",
        "Alpha-2 code": "JP",
        "alpha3": "JPN",
        "Numeric code": 392,
        "ISO 3166-2": "ISO 3166-2:JP"
      },
      {
        "name": "Jersey",
        "Alpha-2 code": "JE",
        "alpha3": "JEY",
        "Numeric code": 832,
        "ISO 3166-2": "ISO 3166-2:JE"
      },
      {
        "name": "Jordan",
        "Alpha-2 code": "JO",
        "alpha3": "JOR",
        "Numeric code": 400,
        "ISO 3166-2": "ISO 3166-2:JO"
      },
      {
        "name": "Kazakhstan",
        "Alpha-2 code": "KZ",
        "alpha3": "KAZ",
        "Numeric code": 398,
        "ISO 3166-2": "ISO 3166-2:KZ"
      },
      {
        "name": "Kenya",
        "Alpha-2 code": "KE",
        "alpha3": "KEN",
        "Numeric code": 404,
        "ISO 3166-2": "ISO 3166-2:KE"
      },
      {
        "name": "Kiribati",
        "Alpha-2 code": "KI",
        "alpha3": "KIR",
        "Numeric code": 296,
        "ISO 3166-2": "ISO 3166-2:KI"
      },
      {
        "name": "Korea, Democratic People's Republic of",
        "Alpha-2 code": "KP",
        "alpha3": "PRK",
        "Numeric code": 408,
        "ISO 3166-2": "ISO 3166-2:KP"
      },
      {
        "name": "Korea, Republic of",
        "Alpha-2 code": "KR",
        "alpha3": "KOR",
        "Numeric code": 410,
        "ISO 3166-2": "ISO 3166-2:KR"
      },
      {
        "name": "Kuwait",
        "Alpha-2 code": "KW",
        "alpha3": "KWT",
        "Numeric code": 414,
        "ISO 3166-2": "ISO 3166-2:KW"
      },
      {
        "name": "Kyrgyzstan",
        "Alpha-2 code": "KG",
        "alpha3": "KGZ",
        "Numeric code": 417,
        "ISO 3166-2": "ISO 3166-2:KG"
      },
      {
        "name": "Lao People's Democratic Republic",
        "Alpha-2 code": "LA",
        "alpha3": "LAO",
        "Numeric code": 418,
        "ISO 3166-2": "ISO 3166-2:LA"
      },
      {
        "name": "Latvia",
        "Alpha-2 code": "LV",
        "alpha3": "LVA",
        "Numeric code": 428,
        "ISO 3166-2": "ISO 3166-2:LV"
      },
      {
        "name": "Lebanon",
        "Alpha-2 code": "LB",
        "alpha3": "LBN",
        "Numeric code": 422,
        "ISO 3166-2": "ISO 3166-2:LB"
      },
      {
        "name": "Lesotho",
        "Alpha-2 code": "LS",
        "alpha3": "LSO",
        "Numeric code": 426,
        "ISO 3166-2": "ISO 3166-2:LS"
      },
      {
        "name": "Liberia",
        "Alpha-2 code": "LR",
        "alpha3": "LBR",
        "Numeric code": 430,
        "ISO 3166-2": "ISO 3166-2:LR"
      },
      {
        "name": "Libyan Arab Jamahiriya",
        "Alpha-2 code": "LY",
        "alpha3": "LBY",
        "Numeric code": 434,
        "ISO 3166-2": "ISO 3166-2:LY"
      },
      {
        "name": "Liechtenstein",
        "Alpha-2 code": "LI",
        "alpha3": "LIE",
        "Numeric code": 438,
        "ISO 3166-2": "ISO 3166-2:LI"
      },
      {
        "name": "Lithuania",
        "Alpha-2 code": "LT",
        "alpha3": "LTU",
        "Numeric code": 440,
        "ISO 3166-2": "ISO 3166-2:LT"
      },
      {
        "name": "Luxembourg",
        "Alpha-2 code": "LU",
        "alpha3": "LUX",
        "Numeric code": 442,
        "ISO 3166-2": "ISO 3166-2:LU"
      },
      {
        "name": "Macao",
        "Alpha-2 code": "MO",
        "alpha3": "MAC",
        "Numeric code": 446,
        "ISO 3166-2": "ISO 3166-2:MO"
      },
      {
        "name": "Macedonia, the former Yugoslav Republic of",
        "Alpha-2 code": "MK",
        "alpha3": "MKD",
        "Numeric code": 807,
        "ISO 3166-2": "ISO 3166-2:MK"
      },
      {
        "name": "Madagascar",
        "Alpha-2 code": "MG",
        "alpha3": "MDG",
        "Numeric code": 450,
        "ISO 3166-2": "ISO 3166-2:MG"
      },
      {
        "name": "Malawi",
        "Alpha-2 code": "MW",
        "alpha3": "MWI",
        "Numeric code": 454,
        "ISO 3166-2": "ISO 3166-2:MW"
      },
      {
        "name": "Malaysia",
        "Alpha-2 code": "MY",
        "alpha3": "MYS",
        "Numeric code": 458,
        "ISO 3166-2": "ISO 3166-2:MY"
      },
      {
        "name": "Maldives",
        "Alpha-2 code": "MV",
        "alpha3": "MDV",
        "Numeric code": 462,
        "ISO 3166-2": "ISO 3166-2:MV"
      },
      {
        "name": "Mali",
        "Alpha-2 code": "ML",
        "alpha3": "MLI",
        "Numeric code": 466,
        "ISO 3166-2": "ISO 3166-2:ML"
      },
      {
        "name": "Malta",
        "Alpha-2 code": "MT",
        "alpha3": "MLT",
        "Numeric code": 470,
        "ISO 3166-2": "ISO 3166-2:MT"
      },
      {
        "name": "Marshall Islands",
        "Alpha-2 code": "MH",
        "alpha3": "MHL",
        "Numeric code": 584,
        "ISO 3166-2": "ISO 3166-2:MH"
      },
      {
        "name": "Martinique",
        "Alpha-2 code": "MQ",
        "alpha3": "MTQ",
        "Numeric code": 474,
        "ISO 3166-2": "ISO 3166-2:MQ"
      },
      {
        "name": "Mauritania",
        "Alpha-2 code": "MR",
        "alpha3": "MRT",
        "Numeric code": 478,
        "ISO 3166-2": "ISO 3166-2:MR"
      },
      {
        "name": "Mauritius",
        "Alpha-2 code": "MU",
        "alpha3": "MUS",
        "Numeric code": 480,
        "ISO 3166-2": "ISO 3166-2:MU"
      },
      {
        "name": "Mayotte",
        "Alpha-2 code": "YT",
        "alpha3": "MYT",
        "Numeric code": 175,
        "ISO 3166-2": "ISO 3166-2:YT"
      },
      {
        "name": "Mexico",
        "Alpha-2 code": "MX",
        "alpha3": "MEX",
        "Numeric code": 484,
        "ISO 3166-2": "ISO 3166-2:MX"
      },
      {
        "name": "Micronesia, Federated States of",
        "Alpha-2 code": "FM",
        "alpha3": "FSM",
        "Numeric code": 583,
        "ISO 3166-2": "ISO 3166-2:FM"
      },
      {
        "name": "Moldova, Republic of",
        "Alpha-2 code": "MD",
        "alpha3": "MDA",
        "Numeric code": 498,
        "ISO 3166-2": "ISO 3166-2:MD"
      },
      {
        "name": "Monaco",
        "Alpha-2 code": "MC",
        "alpha3": "MCO",
        "Numeric code": 492,
        "ISO 3166-2": "ISO 3166-2:MC"
      },
      {
        "name": "Mongolia",
        "Alpha-2 code": "MN",
        "alpha3": "MNG",
        "Numeric code": 496,
        "ISO 3166-2": "ISO 3166-2:MN"
      },
      {
        "name": "Montenegro",
        "Alpha-2 code": "ME",
        "alpha3": "MNE",
        "Numeric code": 499,
        "ISO 3166-2": "ISO 3166-2:ME"
      },
      {
        "name": "Montserrat",
        "Alpha-2 code": "MS",
        "alpha3": "MSR",
        "Numeric code": 500,
        "ISO 3166-2": "ISO 3166-2:MS"
      },
      {
        "name": "Morocco",
        "Alpha-2 code": "MA",
        "alpha3": "MAR",
        "Numeric code": 504,
        "ISO 3166-2": "ISO 3166-2:MA"
      },
      {
        "name": "Mozambique",
        "Alpha-2 code": "MZ",
        "alpha3": "MOZ",
        "Numeric code": 508,
        "ISO 3166-2": "ISO 3166-2:MZ"
      },
      {
        "name": "Myanmar",
        "Alpha-2 code": "MM",
        "alpha3": "MMR",
        "Numeric code": 104,
        "ISO 3166-2": "ISO 3166-2:MM"
      },
      {
        "name": "Namibia",
        "Alpha-2 code": "NA",
        "alpha3": "NAM",
        "Numeric code": 516,
        "ISO 3166-2": "ISO 3166-2:NA"
      },
      {
        "name": "Nauru",
        "Alpha-2 code": "NR",
        "alpha3": "NRU",
        "Numeric code": 520,
        "ISO 3166-2": "ISO 3166-2:NR"
      },
      {
        "name": "Nepal",
        "Alpha-2 code": "NP",
        "alpha3": "NPL",
        "Numeric code": 524,
        "ISO 3166-2": "ISO 3166-2:NP"
      },
      {
        "name": "Netherlands",
        "Alpha-2 code": "NL",
        "alpha3": "NLD",
        "Numeric code": 528,
        "ISO 3166-2": "ISO 3166-2:NL"
      },
      {
        "name": "Netherlands Antilles",
        "Alpha-2 code": "AN",
        "alpha3": "ANT",
        "Numeric code": 530,
        "ISO 3166-2": "ISO 3166-2:AN"
      },
      {
        "name": "New Caledonia",
        "Alpha-2 code": "NC",
        "alpha3": "NCL",
        "Numeric code": 540,
        "ISO 3166-2": "ISO 3166-2:NC"
      },
      {
        "name": "New Zealand",
        "Alpha-2 code": "NZ",
        "alpha3": "NZL",
        "Numeric code": 554,
        "ISO 3166-2": "ISO 3166-2:NZ"
      },
      {
        "name": "Nicaragua",
        "Alpha-2 code": "NI",
        "alpha3": "NIC",
        "Numeric code": 558,
        "ISO 3166-2": "ISO 3166-2:NI"
      },
      {
        "name": "Niger",
        "Alpha-2 code": "NE",
        "alpha3": "NER",
        "Numeric code": 562,
        "ISO 3166-2": "ISO 3166-2:NE"
      },
      {
        "name": "Nigeria",
        "Alpha-2 code": "NG",
        "alpha3": "NGA",
        "Numeric code": 566,
        "ISO 3166-2": "ISO 3166-2:NG"
      },
      {
        "name": "Niue",
        "Alpha-2 code": "NU",
        "alpha3": "NIU",
        "Numeric code": 570,
        "ISO 3166-2": "ISO 3166-2:NU"
      },
      {
        "name": "Norfolk Island",
        "Alpha-2 code": "NF",
        "alpha3": "NFK",
        "Numeric code": 574,
        "ISO 3166-2": "ISO 3166-2:NF"
      },
      {
        "name": "Northern Mariana Islands",
        "Alpha-2 code": "MP",
        "alpha3": "MNP",
        "Numeric code": 580,
        "ISO 3166-2": "ISO 3166-2:MP"
      },
      {
        "name": "Norway",
        "Alpha-2 code": "NO",
        "alpha3": "NOR",
        "Numeric code": 578,
        "ISO 3166-2": "ISO 3166-2:NO"
      },
      {
        "name": "Oman",
        "Alpha-2 code": "OM",
        "alpha3": "OMN",
        "Numeric code": 512,
        "ISO 3166-2": "ISO 3166-2:OM"
      },
      {
        "name": "Pakistan",
        "Alpha-2 code": "PK",
        "alpha3": "PAK",
        "Numeric code": 586,
        "ISO 3166-2": "ISO 3166-2:PK"
      },
      {
        "name": "Palau",
        "Alpha-2 code": "PW",
        "alpha3": "PLW",
        "Numeric code": 585,
        "ISO 3166-2": "ISO 3166-2:PW"
      },
      {
        "name": "Palestinian Territory, Occupied",
        "Alpha-2 code": "PS",
        "alpha3": "PSE",
        "Numeric code": 275,
        "ISO 3166-2": "ISO 3166-2:PS"
      },
      {
        "name": "Panama",
        "Alpha-2 code": "PA",
        "alpha3": "PAN",
        "Numeric code": 591,
        "ISO 3166-2": "ISO 3166-2:PA"
      },
      {
        "name": "Papua New Guinea",
        "Alpha-2 code": "PG",
        "alpha3": "PNG",
        "Numeric code": 598,
        "ISO 3166-2": "ISO 3166-2:PG"
      },
      {
        "name": "Paraguay",
        "Alpha-2 code": "PY",
        "alpha3": "PRY",
        "Numeric code": 600,
        "ISO 3166-2": "ISO 3166-2:PY"
      },
      {
        "name": "Peru",
        "Alpha-2 code": "PE",
        "alpha3": "PER",
        "Numeric code": 604,
        "ISO 3166-2": "ISO 3166-2:PE"
      },
      {
        "name": "Philippines",
        "Alpha-2 code": "PH",
        "alpha3": "PHL",
        "Numeric code": 608,
        "ISO 3166-2": "ISO 3166-2:PH"
      },
      {
        "name": "Pitcairn",
        "Alpha-2 code": "PN",
        "alpha3": "PCN",
        "Numeric code": 612,
        "ISO 3166-2": "ISO 3166-2:PN"
      },
      {
        "name": "Poland",
        "Alpha-2 code": "PL",
        "alpha3": "POL",
        "Numeric code": 616,
        "ISO 3166-2": "ISO 3166-2:PL"
      },
      {
        "name": "Portugal",
        "Alpha-2 code": "PT",
        "alpha3": "PRT",
        "Numeric code": 620,
        "ISO 3166-2": "ISO 3166-2:PT"
      },
      {
        "name": "Puerto Rico",
        "Alpha-2 code": "PR",
        "alpha3": "PRI",
        "Numeric code": 630,
        "ISO 3166-2": "ISO 3166-2:PR"
      },
      {
        "name": "Qatar",
        "Alpha-2 code": "QA",
        "alpha3": "QAT",
        "Numeric code": 634,
        "ISO 3166-2": "ISO 3166-2:QA"
      },
      {
        "name": "Réunion",
        "Alpha-2 code": "RE",
        "alpha3": "REU",
        "Numeric code": 638,
        "ISO 3166-2": "ISO 3166-2:RE"
      },
      {
        "name": "Romania",
        "Alpha-2 code": "RO",
        "alpha3": "ROU",
        "Numeric code": 642,
        "ISO 3166-2": "ISO 3166-2:RO"
      },
      {
        "name": "Russian Federation",
        "Alpha-2 code": "RU",
        "alpha3": "RUS",
        "Numeric code": 643,
        "ISO 3166-2": "ISO 3166-2:RU"
      },
      {
        "name": "Rwanda",
        "Alpha-2 code": "RW",
        "alpha3": "RWA",
        "Numeric code": 646,
        "ISO 3166-2": "ISO 3166-2:RW"
      },
      {
        "name": "Saint Barthélemy",
        "Alpha-2 code": "BL",
        "alpha3": "BLM",
        "Numeric code": 652,
        "ISO 3166-2": "ISO 3166-2:BL"
      },
      {
        "name": "Saint Helena, Ascension and Tristan da Cunha",
        "Alpha-2 code": "SH",
        "alpha3": "SHN",
        "Numeric code": 654,
        "ISO 3166-2": "ISO 3166-2:SH"
      },
      {
        "name": "Saint Kitts and Nevis",
        "Alpha-2 code": "KN",
        "alpha3": "KNA",
        "Numeric code": 659,
        "ISO 3166-2": "ISO 3166-2:KN"
      },
      {
        "name": "Saint Lucia",
        "Alpha-2 code": "LC",
        "alpha3": "LCA",
        "Numeric code": 662,
        "ISO 3166-2": "ISO 3166-2:LC"
      },
      {
        "name": "Saint Martin (French part)",
        "Alpha-2 code": "MF",
        "alpha3": "MAF",
        "Numeric code": 663,
        "ISO 3166-2": "ISO 3166-2:MF"
      },
      {
        "name": "Saint Pierre and Miquelon",
        "Alpha-2 code": "PM",
        "alpha3": "SPM",
        "Numeric code": 666,
        "ISO 3166-2": "ISO 3166-2:PM"
      },
      {
        "name": "Saint Vincent and the Grenadines",
        "Alpha-2 code": "VC",
        "alpha3": "VCT",
        "Numeric code": 670,
        "ISO 3166-2": "ISO 3166-2:VC"
      },
      {
        "name": "Samoa",
        "Alpha-2 code": "WS",
        "alpha3": "WSM",
        "Numeric code": 882,
        "ISO 3166-2": "ISO 3166-2:WS"
      },
      {
        "name": "San Marino",
        "Alpha-2 code": "SM",
        "alpha3": "SMR",
        "Numeric code": 674,
        "ISO 3166-2": "ISO 3166-2:SM"
      },
      {
        "name": "Sao Tome and Principe",
        "Alpha-2 code": "ST",
        "alpha3": "STP",
        "Numeric code": 678,
        "ISO 3166-2": "ISO 3166-2:ST"
      },
      {
        "name": "Saudi Arabia",
        "Alpha-2 code": "SA",
        "alpha3": "SAU",
        "Numeric code": 682,
        "ISO 3166-2": "ISO 3166-2:SA"
      },
      {
        "name": "Senegal",
        "Alpha-2 code": "SN",
        "alpha3": "SEN",
        "Numeric code": 686,
        "ISO 3166-2": "ISO 3166-2:SN"
      },
      {
        "name": "Serbia",
        "Alpha-2 code": "RS",
        "alpha3": "SRB",
        "Numeric code": 688,
        "ISO 3166-2": "ISO 3166-2:RS"
      },
      {
        "name": "Seychelles",
        "Alpha-2 code": "SC",
        "alpha3": "SYC",
        "Numeric code": 690,
        "ISO 3166-2": "ISO 3166-2:SC"
      },
      {
        "name": "Sierra Leone",
        "Alpha-2 code": "SL",
        "alpha3": "SLE",
        "Numeric code": 694,
        "ISO 3166-2": "ISO 3166-2:SL"
      },
      {
        "name": "Singapore",
        "Alpha-2 code": "SG",
        "alpha3": "SGP",
        "Numeric code": 702,
        "ISO 3166-2": "ISO 3166-2:SG"
      },
      {
        "name": "Slovakia",
        "Alpha-2 code": "SK",
        "alpha3": "SVK",
        "Numeric code": 703,
        "ISO 3166-2": "ISO 3166-2:SK"
      },
      {
        "name": "Slovenia",
        "Alpha-2 code": "SI",
        "alpha3": "SVN",
        "Numeric code": 705,
        "ISO 3166-2": "ISO 3166-2:SI"
      },
      {
        "name": "Solomon Islands",
        "Alpha-2 code": "SB",
        "alpha3": "SLB",
        "Numeric code": "090",
        "ISO 3166-2": "ISO 3166-2:SB"
      },
      {
        "name": "Somalia",
        "Alpha-2 code": "SO",
        "alpha3": "SOM",
        "Numeric code": 706,
        "ISO 3166-2": "ISO 3166-2:SO"
      },
      {
        "name": "South Africa",
        "Alpha-2 code": "ZA",
        "alpha3": "ZAF",
        "Numeric code": 710,
        "ISO 3166-2": "ISO 3166-2:ZA"
      },
      {
        "name": "South Georgia and the South Sandwich Islands",
        "Alpha-2 code": "GS",
        "alpha3": "SGS",
        "Numeric code": 239,
        "ISO 3166-2": "ISO 3166-2:GS"
      },
      {
        "name": "Spain",
        "Alpha-2 code": "ES",
        "alpha3": "ESP",
        "Numeric code": 724,
        "ISO 3166-2": "ISO 3166-2:ES"
      },
      {
        "name": "Sri Lanka",
        "Alpha-2 code": "LK",
        "alpha3": "LKA",
        "Numeric code": 144,
        "ISO 3166-2": "ISO 3166-2:LK"
      },
      {
        "name": "Sudan",
        "Alpha-2 code": "SD",
        "alpha3": "SDN",
        "Numeric code": 736,
        "ISO 3166-2": "ISO 3166-2:SD"
      },
      {
        "name": "Suriname",
        "Alpha-2 code": "SR",
        "alpha3": "SUR",
        "Numeric code": 740,
        "ISO 3166-2": "ISO 3166-2:SR"
      },
      {
        "name": "Svalbard and Jan Mayen",
        "Alpha-2 code": "SJ",
        "alpha3": "SJM",
        "Numeric code": 744,
        "ISO 3166-2": "ISO 3166-2:SJ"
      },
      {
        "name": "Swaziland",
        "Alpha-2 code": "SZ",
        "alpha3": "SWZ",
        "Numeric code": 748,
        "ISO 3166-2": "ISO 3166-2:SZ"
      },
      {
        "name": "Sweden",
        "Alpha-2 code": "SE",
        "alpha3": "SWE",
        "Numeric code": 752,
        "ISO 3166-2": "ISO 3166-2:SE"
      },
      {
        "name": "Switzerland",
        "Alpha-2 code": "CH",
        "alpha3": "CHE",
        "Numeric code": 756,
        "ISO 3166-2": "ISO 3166-2:CH"
      },
      {
        "name": "Syrian Arab Republic",
        "Alpha-2 code": "SY",
        "alpha3": "SYR",
        "Numeric code": 760,
        "ISO 3166-2": "ISO 3166-2:SY"
      },
      {
        "name": "Taiwan, Province of China",
        "Alpha-2 code": "TW",
        "alpha3": "TWN",
        "Numeric code": 158,
        "ISO 3166-2": "ISO 3166-2:TW"
      },
      {
        "name": "Tajikistan",
        "Alpha-2 code": "TJ",
        "alpha3": "TJK",
        "Numeric code": 762,
        "ISO 3166-2": "ISO 3166-2:TJ"
      },
      {
        "name": "Tanzania, United Republic of",
        "Alpha-2 code": "TZ",
        "alpha3": "TZA",
        "Numeric code": 834,
        "ISO 3166-2": "ISO 3166-2:TZ"
      },
      {
        "name": "Thailand",
        "Alpha-2 code": "TH",
        "alpha3": "THA",
        "Numeric code": 764,
        "ISO 3166-2": "ISO 3166-2:TH"
      },
      {
        "name": "Timor-Leste",
        "Alpha-2 code": "TL",
        "alpha3": "TLS",
        "Numeric code": 626,
        "ISO 3166-2": "ISO 3166-2:TL"
      },
      {
        "name": "Togo",
        "Alpha-2 code": "TG",
        "alpha3": "TGO",
        "Numeric code": 768,
        "ISO 3166-2": "ISO 3166-2:TG"
      },
      {
        "name": "Tokelau",
        "Alpha-2 code": "TK",
        "alpha3": "TKL",
        "Numeric code": 772,
        "ISO 3166-2": "ISO 3166-2:TK"
      },
      {
        "name": "Tonga",
        "Alpha-2 code": "TO",
        "alpha3": "TON",
        "Numeric code": 776,
        "ISO 3166-2": "ISO 3166-2:TO"
      },
      {
        "name": "Trinidad and Tobago",
        "Alpha-2 code": "TT",
        "alpha3": "TTO",
        "Numeric code": 780,
        "ISO 3166-2": "ISO 3166-2:TT"
      },
      {
        "name": "Tunisia",
        "Alpha-2 code": "TN",
        "alpha3": "TUN",
        "Numeric code": 788,
        "ISO 3166-2": "ISO 3166-2:TN"
      },
      {
        "name": "Turkey",
        "Alpha-2 code": "TR",
        "alpha3": "TUR",
        "Numeric code": 792,
        "ISO 3166-2": "ISO 3166-2:TR"
      },
      {
        "name": "Turkmenistan",
        "Alpha-2 code": "TM",
        "alpha3": "TKM",
        "Numeric code": 795,
        "ISO 3166-2": "ISO 3166-2:TM"
      },
      {
        "name": "Turks and Caicos Islands",
        "Alpha-2 code": "TC",
        "alpha3": "TCA",
        "Numeric code": 796,
        "ISO 3166-2": "ISO 3166-2:TC"
      },
      {
        "name": "Tuvalu",
        "Alpha-2 code": "TV",
        "alpha3": "TUV",
        "Numeric code": 798,
        "ISO 3166-2": "ISO 3166-2:TV"
      },
      {
        "name": "Uganda",
        "Alpha-2 code": "UG",
        "alpha3": "UGA",
        "Numeric code": 800,
        "ISO 3166-2": "ISO 3166-2:UG"
      },
      {
        "name": "Ukraine",
        "Alpha-2 code": "UA",
        "alpha3": "UKR",
        "Numeric code": 804,
        "ISO 3166-2": "ISO 3166-2:UA"
      },
      {
        "name": "United Arab Emirates",
        "Alpha-2 code": "AE",
        "alpha3": "ARE",
        "Numeric code": 784,
        "ISO 3166-2": "ISO 3166-2:AE"
      },
      {
        "name": "United Kingdom",
        "Alpha-2 code": "GB",
        "alpha3": "GBR",
        "Numeric code": 826,
        "ISO 3166-2": "ISO 3166-2:GB"
      },
      {
        "name": "United States",
        "Alpha-2 code": "US",
        "alpha3": "USA",
        "Numeric code": 840,
        "ISO 3166-2": "ISO 3166-2:US"
      },
      {
        "name": "United States Minor Outlying Islands",
        "Alpha-2 code": "UM",
        "alpha3": "UMI",
        "Numeric code": 581,
        "ISO 3166-2": "ISO 3166-2:UM"
      },
      {
        "name": "Uruguay",
        "Alpha-2 code": "UY",
        "alpha3": "URY",
        "Numeric code": 858,
        "ISO 3166-2": "ISO 3166-2:UY"
      },
      {
        "name": "Uzbekistan",
        "Alpha-2 code": "UZ",
        "alpha3": "UZB",
        "Numeric code": 860,
        "ISO 3166-2": "ISO 3166-2:UZ"
      },
      {
        "name": "Vanuatu",
        "Alpha-2 code": "VU",
        "alpha3": "VUT",
        "Numeric code": 548,
        "ISO 3166-2": "ISO 3166-2:VU"
      },
      {
        "name": "Venezuela, Bolivarian Republic of",
        "Alpha-2 code": "VE",
        "alpha3": "VEN",
        "Numeric code": 862,
        "ISO 3166-2": "ISO 3166-2:VE"
      },
      {
        "name": "Vietnam",
        "Alpha-2 code": "VN",
        "alpha3": "VNM",
        "Numeric code": 704,
        "ISO 3166-2": "ISO 3166-2:VN"
      },
      {
        "name": "Virgin Islands, British",
        "Alpha-2 code": "VG",
        "alpha3": "VGB",
        "Numeric code": "092",
        "ISO 3166-2": "ISO 3166-2:VG"
      },
      {
        "name": "Virgin Islands, U.S.",
        "Alpha-2 code": "VI",
        "alpha3": "VIR",
        "Numeric code": 850,
        "ISO 3166-2": "ISO 3166-2:VI"
      },
      {
        "name": "Wallis and Futuna",
        "Alpha-2 code": "WF",
        "alpha3": "WLF",
        "Numeric code": 876,
        "ISO 3166-2": "ISO 3166-2:WF"
      },
      {
        "name": "Western Sahara",
        "Alpha-2 code": "EH",
        "alpha3": "ESH",
        "Numeric code": 732,
        "ISO 3166-2": "ISO 3166-2:EH"
      },
      {
        "name": "Yemen",
        "Alpha-2 code": "YE",
        "alpha3": "YEM",
        "Numeric code": 887,
        "ISO 3166-2": "ISO 3166-2:YE"
      },
      {
        "name": "Zambia",
        "Alpha-2 code": "ZM",
        "alpha3": "ZMB",
        "Numeric code": 894,
        "ISO 3166-2": "ISO 3166-2:ZM"
      },
      {
        "name": "Zimbabwe",
        "Alpha-2 code": "ZW",
        "alpha3": "ZWE",
        "Numeric code": 716,
        "ISO 3166-2": "ISO 3166-2:ZW"
      }
    ]
    let countryData = countryCodes.filter(country => country.name.toLocaleLowerCase().includes(countryName));

    console.log(countryData)
  
    if (countryData.length === 0) {
      this.errorMessage = 'No information for that country. Please select another.';
      return throwError(() => new Error(this.errorMessage));
    } else {
      let countryCode = countryData[0].alpha3;
          // This will fetch the country data based on the Country ISO Code
      let apiQuery = `https://api.worldbank.org/v2/country/${countryCode}?format=json`
      return this.http.get(apiQuery);
    }


  }

  setCountryData($event: any) {

    // This function takes in the event, calls the "getCountryName" method and the calls the "fetchCountryData" method that will query the API and return an observable to us. It then creates a new subject with a filtered data set that can be passed to the component.

    let subject = new Subject();
    let countryName = this.getCountryName($event);
    this.fetchCountryData(countryName).subscribe({
      next: (data: any) => {
        if (data[0].message !== undefined) {
          if (data[0].message[0].id === "120") {
            this.errorMessage = 'No information for that country. Please select another.'; 
          }
          
        } 
        else {
          subject.next({
            name: data[1][0].name,
            capitalCity: data[1][0].capitalCity,
            region: data[1][0].region.value,
            incomeLevel: data[1][0].incomeLevel.value,
            longitude: data[1][0].longitude,
            latitude: data[1][0].latitude
          });
        }
      },
      error: (err) => {
        this.errorMessage = 'Data stream error. Please try again.';
      }
    });

    return subject.asObservable();
  }

}




