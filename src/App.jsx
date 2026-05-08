import { useState, useRef, useEffect } from "react";

const theme = {
  bg: "#0a0f0d", surface: "#111a14", surfaceAlt: "#162019", border: "#1e3024",
  accent: "#2dd87a", accentDim: "#1a8f4f", water: "#1a9cc7", waterDim: "#0e6a8a",
  text: "#e8f0ea", textMuted: "#7a9a82", warning: "#d4a72c", danger: "#c0392b",
  excellent: "#2dd87a", good: "#7ac943", fair: "#d4a72c", poor: "#c0392b",
};

const forecastData = [
  { day: "Today", date: "Fri 8 May", rating: "Excellent", score: 9.2, pressure: "Rising", moon: "Waxing Gibbous", wind: "SW 8mph", temp: "14°C", waterTemp: "11°C", bestTime: "06:00–09:00 & 18:00–21:00", species: ["Carp", "Bream", "Tench"], bait: "Boilies, Sweetcorn", tidal: "High: 08:42" },
  { day: "Saturday", date: "Sat 9 May", rating: "Good", score: 7.8, pressure: "Stable", moon: "Waxing Gibbous", wind: "W 12mph", temp: "13°C", waterTemp: "11°C", bestTime: "07:00–10:00 & 17:00–20:00", species: ["Perch", "Pike", "Roach"], bait: "Lures, Deadbait", tidal: "High: 09:18" },
  { day: "Sunday", date: "Sun 10 May", rating: "Fair", score: 5.4, pressure: "Falling", moon: "Full Moon", wind: "NW 18mph", temp: "11°C", waterTemp: "10°C", bestTime: "Early morning only", species: ["Roach", "Rudd"], bait: "Maggots, Casters", tidal: "High: 10:02" },
  { day: "Monday", date: "Mon 11 May", rating: "Poor", score: 3.1, pressure: "Low", moon: "Full Moon", wind: "N 24mph", temp: "9°C", waterTemp: "10°C", bestTime: "Not recommended", species: [], bait: "Stay home", tidal: "High: 10:51" },
  { day: "Tuesday", date: "Tue 12 May", rating: "Fair", score: 5.9, pressure: "Rising", moon: "Waning Gibbous", wind: "NE 14mph", temp: "12°C", waterTemp: "11°C", bestTime: "10:00–14:00", species: ["Carp", "Bream"], bait: "Pellets, Groundbait", tidal: "High: 11:44" },
  { day: "Wednesday", date: "Wed 13 May", rating: "Good", score: 7.2, pressure: "Rising", moon: "Waning Gibbous", wind: "E 10mph", temp: "15°C", waterTemp: "12°C", bestTime: "06:00–11:00 & 16:00–20:00", species: ["Carp", "Tench", "Bream"], bait: "Boilies, Corn, Pellets", tidal: "High: 12:41" },
  { day: "Thursday", date: "Thu 14 May", rating: "Excellent", score: 8.9, pressure: "High", moon: "Waning Gibbous", wind: "SE 6mph", temp: "17°C", waterTemp: "13°C", bestTime: "Dawn to Dusk — prime conditions", species: ["Carp", "Tench", "Perch", "Bream"], bait: "Boilies, Sweetcorn, Worms", tidal: "High: 13:38" },
];

const directoryData = {
  "Oxfordshire": [
    { id: 1, name: "Farmoor Reservoir", town: "Farmoor, Oxford", type: "Reservoir", pegs: 40, species: ["Trout", "Pike", "Perch", "Bream"], dayTicket: "£15", eveningTicket: "£10", nightFishing: false, rating: 4.6, reviews: 47, campsite: "Farmoor Camping & Caravanning", campsiteDistance: "2.1 miles", campsitePrice: "£18/night", facilities: ["Car park", "Toilets", "Disabled access", "Café nearby"], rules: ["Barbless hooks only", "No braid mainline", "No keepnets for trout", "Max 2 rods"], season: "Open all year", recordFish: "Pike 28lb 4oz", description: "One of Oxfordshire's premier fishing venues, Farmoor Reservoir sits just 5 miles west of Oxford. The vast open water holds excellent stocks of rainbow and brown trout plus a healthy head of specimen pike. Bank fishing is available from designated areas around the entire reservoir perimeter. Dawn sessions in spring are particularly productive for both trout and pike.", comments: [{ user: "CarpKing_Dave", date: "2 days ago", rating: 5, text: "Absolutely cracking session yesterday morning. Had 4 rainbows before 9am on a black buzzer. Water clarity is excellent right now, fish are active in the margins." }, { user: "OxfordAngler", date: "1 week ago", rating: 4, text: "Good pike session on the north bank. Two fish, best 19lb on a roach deadbait. Car park gets busy weekends so arrive early." }, { user: "FlyFisher_Jane", date: "2 weeks ago", rating: 5, text: "Best trout venue in the county for fly fishing. The evening rise in May is something special. Well worth the day ticket." }] },
    { id: 2, name: "Clattercote Reservoir", town: "Clattercote, Banbury", type: "Reservoir", pegs: 28, species: ["Bream", "Tench", "Roach", "Carp", "Perch"], dayTicket: "£8", eveningTicket: "£5", nightFishing: true, rating: 4.1, reviews: 23, campsite: "Clattercote Farm Camping", campsiteDistance: "0.3 miles", campsitePrice: "£12/night", facilities: ["Car park", "Basic toilets", "Fire pits allowed"], rules: ["Carp must be returned", "No boilies April–June", "Night fishing by arrangement", "Unhooking mats compulsory"], season: "March–November", recordFish: "Bream 9lb 12oz", description: "A hidden gem tucked away in north Oxfordshire near the Warwickshire border. Clattercote is a shallow, reed-fringed reservoir averaging around 4 feet deep with extensive lily pad growth on the southern bank. The resident bream shoals are enormous — match anglers regularly bag 50lb+ of bream on method feeder tactics. Tench to 7lb have been recorded.", comments: [{ user: "MatchMan_Terry", date: "3 days ago", rating: 4, text: "110lb of bream and roach in 5 hours on Saturday. The swim opposite the island is a banker — fish pile in as soon as you start feeding. Brilliant value at £8." }, { user: "TenchFanatic", date: "3 weeks ago", rating: 5, text: "Caught my personal best tench here — 7lb 2oz on sweetcorn over groundbait. Very early morning, first two hours of light. Magical venue." }] },
    { id: 3, name: "Oxford Canal — Thrupp", town: "Thrupp, Kidlington", type: "Canal", pegs: 60, species: ["Roach", "Perch", "Bream", "Chub", "Pike"], dayTicket: "EA Licence only", eveningTicket: "Free", nightFishing: false, rating: 4.0, reviews: 31, campsite: "Thrupp Lakeside Park", campsiteDistance: "0.8 miles", campsitePrice: "£20/night", facilities: ["Free parking", "Pubs nearby", "Accessible towpath"], rules: ["EA rod licence required", "No night fishing on towpath", "Respect other canal users"], season: "Open all year (no river close season on canal)", recordFish: "Chub 5lb 3oz", description: "The Oxford Canal through the pretty village of Thrupp offers classic English canal fishing at its finest. The section from Thrupp down to Kidlington holds strong populations of roach, perch and chub. The famous Thrupp pub makes this an excellent all-day venue. Best fished on the float with maggots or casters, the canal responds well to regular loose feeding.", comments: [{ user: "CanalKing", date: "5 days ago", rating: 4, text: "Lovely morning session. Caught 30+ roach on stick float with maggot. The section below the boatyard is the pick of the stretches." }, { user: "BeginnerBob", date: "1 week ago", rating: 4, text: "Took my 8 year old daughter. She caught her first fish here — a lovely little perch. Great accessible venue for families." }] },
  ],
  "Gloucestershire": [
    { id: 4, name: "Lechlade & Bushyleaze Trout Fishery", town: "Lechlade-on-Thames", type: "Lake", pegs: 35, species: ["Carp", "Tench", "Bream", "Roach", "Pike"], dayTicket: "£12", eveningTicket: "£8", nightFishing: true, rating: 4.8, reviews: 89, campsite: "Lechlade on Thames Leisure", campsiteDistance: "0.5 miles", campsitePrice: "£22/night", facilities: ["Car park", "Toilets & showers", "Tackle shop on site", "Café"], rules: ["Unhooking mats mandatory", "No boilies containing nuts", "Slings required for carp over 10lb", "Two rods maximum"], season: "Open all year", recordFish: "Carp 43lb 7oz", description: "Arguably the finest carp and tench fishery in the Cotswolds. Set against the backdrop of the Thames Valley, Lechlade & Bushyleaze is a crystal-clear gravel pit complex offering some of the most challenging and rewarding fishing in the South West. The main lake holds carp to over 40lb alongside a stunning head of large tench. Gin-clear water demands finesse tactics.", comments: [{ user: "CarpSpecialist_Rich", date: "1 day ago", rating: 5, text: "Just back from a 48hr session. Three carp — 31lb, 27lb and a stunning 38lb mirror. The water is gin clear right now, zig rigs have been deadly at 6ft depth. Absolutely world class venue." }, { user: "TenchTerry", date: "4 days ago", rating: 5, text: "Six tench in a morning session, best 8lb 3oz. The southern bay is on fire for tench right now on worm and caster over groundbait. May is the month here without question." }, { user: "WeekendWarrior", date: "2 weeks ago", rating: 4, text: "Beautiful venue. The camping on site is great — woke up to mist over the lake at 5am and had the whole place to myself for an hour. Magical." }] },
    { id: 5, name: "Coln Valley Fishery", town: "Fairford, Gloucestershire", type: "Lake Complex", pegs: 50, species: ["Carp", "F1 Carp", "Tench", "Bream", "Roach"], dayTicket: "£10", eveningTicket: "£7", nightFishing: false, rating: 4.3, reviews: 55, campsite: "Cotswold Camping Fairford", campsiteDistance: "1.5 miles", campsitePrice: "£16/night", facilities: ["Large car park", "Toilets", "Disabled swims available", "Bait shop"], rules: ["Barbless hooks only", "No nuts or tiger nuts", "No fixed leads", "Night fishing not permitted"], season: "Open all year", recordFish: "Carp 29lb 2oz", description: "A family-friendly commercial fishery set in the rolling Gloucestershire countryside near Fairford. The Coln Valley complex comprises three lakes: the Main Lake for specimen carp, the Match Lake for F1s and silvers, and the Pleasure Lake for beginners. Well-managed and heavily stocked, this is an ideal venue for anyone wanting guaranteed sport.", comments: [{ user: "FamilyFisher", date: "3 days ago", rating: 4, text: "Took the kids on Saturday. The pleasure lake was perfect — they both caught within 10 minutes. Friendly staff and well maintained facilities." }, { user: "MatchAngler_Steve", date: "1 week ago", rating: 5, text: "Won the club match here last Sunday with 87lb of F1s on the method feeder. The match lake is absolutely stacked. One to keep on the circuit." }] },
    { id: 6, name: "River Severn — Tewkesbury", town: "Tewkesbury", type: "River", pegs: 45, species: ["Barbel", "Chub", "Pike", "Roach", "Dace", "Perch"], dayTicket: "£6", eveningTicket: null, nightFishing: false, rating: 4.4, reviews: 38, campsite: "Tewkesbury Abbey Caravan Club", campsiteDistance: "0.4 miles", campsitePrice: "£25/night", facilities: ["Car park", "Toilets", "Accessible platforms"], rules: ["EA licence required", "No keepnets for barbel or chub", "River opens 16th June"], season: "16 June – 14 March", recordFish: "Barbel 14lb 1oz", description: "The River Severn at Tewkesbury is one of England's finest barbel rivers with a well-deserved reputation for producing large fish. The stretch around the town bridge holds exceptional chub and barbel in the deep, powerful flow. Hemp and tares in summer, cheesepaste and meat in winter. The confluence of the Avon and Severn creates a variety of swims from slack water to powerful glides.", comments: [{ user: "BarbellBrian", date: "6 days ago", rating: 5, text: "River is fishing brilliantly after the recent rains. Four barbel session yesterday best 11lb 8oz on pellet feeder in the main flow. The Severn in May is something else." }, { user: "ChubChaser", date: "2 weeks ago", rating: 4, text: "Good chub session on the inside line. Six fish to 4lb 9oz on crust. River running slightly coloured which suits the chub perfectly." }] },
  ],
  "Warwickshire": [
    { id: 7, name: "Ashmead Lake", town: "Leamington Spa", type: "Commercial Lake", pegs: 42, species: ["Carp", "F1 Carp", "Ide", "Roach", "Skimmers"], dayTicket: "£10", eveningTicket: "£7", nightFishing: false, rating: 4.4, reviews: 62, campsite: "Warwick Racecourse Camping", campsiteDistance: "3.4 miles", campsitePrice: "£20/night", facilities: ["Large car park", "Modern toilets", "On-site café", "Tackle hire available"], rules: ["Barbless only", "No groundbait in margins before 10am", "Max 2 rods", "Landing nets compulsory"], season: "Open all year", recordFish: "Carp 26lb 14oz", description: "A well-established commercial fishery on the outskirts of Leamington Spa. Ashmead is renowned on the local match circuit for its consistent sport and well-managed swims. The pegged lake is heavily stocked with F1 carp, ide and roach making it ideal for pole and waggler anglers. The specimen lake holds larger carp for those seeking a bigger challenge.", comments: [{ user: "PolerPaul", date: "1 day ago", rating: 5, text: "Won yesterday's club match with 68lb on the pole at 11 metres. F1s were queuing up all day. The café does a great breakfast too — arrived at 7am, fished until 3pm, perfect day." }, { user: "WarwickAngler", date: "5 days ago", rating: 4, text: "Good solid session. The ide are back in numbers now the water has warmed. Surface fishing produced 12 fish in the last hour. Great venue." }] },
    { id: 8, name: "Kingsbury Water Park", town: "Kingsbury, Tamworth", type: "Lake Complex", pegs: 80, species: ["Pike", "Perch", "Bream", "Tench", "Carp", "Roach"], dayTicket: "£8", eveningTicket: null, nightFishing: false, rating: 4.2, reviews: 44, campsite: "Kingsbury Water Park Camping", campsiteDistance: "On site", campsitePrice: "£22/night", facilities: ["Multiple car parks", "Visitor centre", "Café & toilets", "Disabled access throughout"], rules: ["EA licence required for some lakes", "Pike to be returned immediately", "No bait boats"], season: "Open all year on most lakes", recordFish: "Pike 31lb 6oz", description: "A stunning country park and nature reserve comprising over 30 lakes of varying sizes near Tamworth. Kingsbury offers something for every angler — from heavily stocked match lakes to wild, reed-fringed specimen waters. The pike fishing is exceptional in winter, while summer produces excellent tench and bream sport. The on-site campsite makes it perfect for overnight trips.", comments: [{ user: "PikePeter", date: "1 week ago", rating: 5, text: "The pike fishing here is outstanding. Three fish over 20lb in a morning session on the main reservoir. Use large smelt or mackerel deadbaits and you're in business." }, { user: "FamilyDayOut", date: "2 weeks ago", rating: 4, text: "Great day out with the family. Kids loved the nature reserve. Fishing was good too — plenty of small perch and roach to keep them entertained all day." }] },
    { id: 9, name: "Draycote Water", town: "Rugby", type: "Reservoir", pegs: 55, species: ["Rainbow Trout", "Brown Trout", "Pike", "Perch"], dayTicket: "£28 (5 fish)", eveningTicket: "£20 (3 fish)", nightFishing: false, rating: 4.5, reviews: 71, campsite: "Draycote Meadows Campsite", campsiteDistance: "1.2 miles", campsitePrice: "£19/night", facilities: ["Boat hire available", "Fishing lodge & café", "Tackle shop", "Disabled jetties"], rules: ["Fly fishing only for trout", "All pike to be returned", "Boats available for hire", "No keepnets"], season: "1 March – 31 October (trout). Pike all year.", recordFish: "Rainbow Trout 13lb 2oz", description: "One of the Midlands' premier fly fishing reservoirs covering 600 acres. Draycote Water is managed specifically for high-quality trout fishing with both bank and boat options. The reservoir is regularly stocked with rainbow and brown trout from 2lb upwards. Bank fishing from designated areas around the dam and northern shore. Boat hire adds a new dimension and allows access to productive midwater areas.", comments: [{ user: "FlyTyerMike", date: "2 days ago", rating: 5, text: "Brilliant session from the boat yesterday. Eight rainbows on a damsel nymph pattern, best around 4lb. The fish are right up in the top 3 feet in this warm weather. Dries working well in the evenings." }, { user: "ReservoirRod", date: "1 week ago", rating: 4, text: "Good bank session near the dam wall. Four fish to 3lb 8oz on a black and green blob. The café is excellent — perfect end to the session." }] },
  ],
  "Worcestershire": [
    { id: 10, name: "River Avon — Evesham", town: "Evesham", type: "River", pegs: 70, species: ["Barbel", "Chub", "Bream", "Roach", "Pike", "Perch"], dayTicket: "£6", eveningTicket: null, nightFishing: false, rating: 4.6, reviews: 83, campsite: "Evesham Caravan Park", campsiteDistance: "0.6 miles", campsitePrice: "£18/night", facilities: ["Town centre access", "Multiple car parks", "Cafés and shops nearby"], rules: ["EA licence required", "River season 16 June – 14 March", "No keepnets for barbel"], season: "16 June – 14 March", recordFish: "Barbel 15lb 9oz", description: "The River Avon through Evesham town is one of the most famous barbel and bream venues in the West Midlands. The deep, slow-moving river through town contains enormous shoals of bream averaging 4–6lb, plus a renowned barbel population that has produced fish well into double figures. The town stretch is easily accessible and well signposted from the market square.", comments: [{ user: "AvonAngler", date: "3 days ago", rating: 5, text: "The bream are in! Had 14 fish in 4 hours yesterday on method feeder, best 6lb 4oz. The swim near the footbridge is absolutely stacked right now." }, { user: "BarbellHunter", date: "1 week ago", rating: 5, text: "Two barbel in the dark last night, 9lb and 11lb 6oz. Hemp and pellet feeder on the near-side crease. The Avon is absolutely fishing its head off at the moment." }] },
    { id: 11, name: "Tardebigge Reservoir", town: "Bromsgrove", type: "Reservoir", pegs: 22, species: ["Carp", "Tench", "Bream", "Roach", "Perch"], dayTicket: "£9", eveningTicket: null, nightFishing: false, rating: 4.0, reviews: 19, campsite: "Avoncroft Camping", campsiteDistance: "2.8 miles", campsitePrice: "£14/night", facilities: ["Car park", "Basic facilities", "Canal boat traffic adds character"], rules: ["Barbless only", "Max 2 rods", "No boilies", "Float and feeder fishing only"], season: "April–October", recordFish: "Tench 6lb 8oz", description: "A picturesque canal reservoir near Bromsgrove on the Worcestershire-Warwickshire border. Tardebigge feeds the famous Tardebigge flight of canal locks and offers tranquil, unhurried fishing in a beautiful rural setting. The reservoir holds a good head of tench and bream alongside roach and perch. Ideal for anglers who prefer a quieter, more traditional fishing experience away from commercial venues.", comments: [{ user: "QuietWaters", date: "2 weeks ago", rating: 4, text: "Just what I needed. Three hours of float fishing for roach and perch with barely another angler in sight. Simple, peaceful, proper fishing." }] },
    { id: 12, name: "Croome Court Lake", town: "Severn Stoke, Worcester", type: "Estate Lake", pegs: 18, species: ["Carp", "Pike", "Perch", "Roach", "Tench"], dayTicket: "£14", eveningTicket: null, nightFishing: false, rating: 4.7, reviews: 28, campsite: "Croome Camping", campsiteDistance: "On site", campsitePrice: "£20/night", facilities: ["Historic parkland setting", "Car park", "Toilets"], rules: ["Advance booking required", "Carp to be returned immediately", "No bait boats", "Single hook rigs only"], season: "May–October", recordFish: "Carp 36lb 11oz", description: "One of the most beautiful and exclusive fishing venues in the Midlands. The Croome Court lake sits within the historic National Trust parkland designed by Capability Brown and offers a genuinely unique fishing experience. Limited tickets ensure the water is never overcrowded. The estate lake holds a stunning head of old, dark-scaled carp alongside quality pike and perch.", comments: [{ user: "EstateAngler", date: "1 week ago", rating: 5, text: "Booked in advance as required and had the lake virtually to myself. Caught a dark, old mirror of 28lb in the most beautiful surroundings imaginable. Worth every penny of the £14." }, { user: "HeritageHooker", date: "3 weeks ago", rating: 5, text: "This place is absolutely unique. Capability Brown-designed parkland, deer in the background, and a 34lb carp on the bank by 7am. Fishing doesn't get better than this." }] },
  ],
  "Northamptonshire": [
    { id: 13, name: "Billing Aquadrome", town: "Northampton", type: "Lake Complex", pegs: 90, species: ["Carp", "Pike", "Bream", "Roach", "Tench", "Perch"], dayTicket: "£9", eveningTicket: "£6", nightFishing: true, rating: 4.1, reviews: 56, campsite: "Billing Aquadrome Holiday Park", campsiteDistance: "On site", campsitePrice: "£28/night", facilities: ["Full holiday park facilities", "Restaurant & bar", "Tackle shop", "Toilets & showers"], rules: ["Night fishing on designated lakes only", "Bait boats permitted on some lakes", "Carp care kit required for night fishing"], season: "Open all year", recordFish: "Carp 41lb 3oz", description: "A large holiday and leisure complex near Northampton offering fishing across multiple lakes within a full holiday park setting. Billing is popular with families who want to mix fishing with other activities. The specimen lake holds some outstanding carp including fish over 40lb. Night fishing is available on booking. The on-site holiday park makes it ideal for a full fishing holiday.", comments: [{ user: "NightFisher_Ned", date: "4 days ago", rating: 4, text: "Two nights on the specimen lake. Four carp, best 29lb. The nocturnal feeding is well worth the night ticket. Comfortable facilities make the night session easy." }, { user: "FamilyTrip", date: "1 week ago", rating: 4, text: "Wife and kids used the holiday park while I fished. Everyone happy. Good fishing, great facilities, worked brilliantly as a family holiday." }] },
    { id: 14, name: "Naseby Reservoir", town: "Naseby", type: "Reservoir", pegs: 30, species: ["Roach", "Perch", "Pike", "Bream", "Tench"], dayTicket: "£7", eveningTicket: null, nightFishing: false, rating: 3.9, reviews: 17, campsite: "Naseby Battlefield Campsite", campsiteDistance: "1.1 miles", campsitePrice: "£12/night", facilities: ["Car park", "Basic toilets", "Historic location"], rules: ["EA licence required", "No night fishing", "No bait boats"], season: "Open all year", recordFish: "Pike 24lb 8oz", description: "A historic reservoir near the famous English Civil War battlefield site of Naseby. The reservoir is a well-kept secret among local anglers offering quality roach and perch fishing alongside some exceptional pike sport in autumn and winter. The rural Northamptonshire setting is beautiful and the venue rarely gets overcrowded.", comments: [{ user: "HistoryBuff_Angler", date: "3 weeks ago", rating: 4, text: "What a lovely venue. Quiet, peaceful and great fishing. Had eight quality roach to 1lb 4oz on stick float. The pike in winter are supposedly outstanding — will be back." }] },
  ],
  "Yorkshire": [
    { id: 15, name: "Wintersett Reservoir", town: "Wakefield", type: "Reservoir", pegs: 48, species: ["Bream", "Tench", "Roach", "Perch", "Pike", "Carp"], dayTicket: "£7", eveningTicket: null, nightFishing: false, rating: 4.3, reviews: 41, campsite: "Nostell Priory Camping", campsiteDistance: "3.2 miles", campsitePrice: "£17/night", facilities: ["Car park", "Toilets", "Country park setting"], rules: ["EA licence required", "Barbless hooks only on match pegs", "No night fishing"], season: "Open all year", recordFish: "Bream 11lb 4oz", description: "A productive West Yorkshire reservoir near Wakefield with an outstanding reputation for quality bream and tench fishing. Wintersett is one of the region's most consistent match venues and has produced some exceptional specimen bream over the years. The reservoir is set within a lovely country park with waymarked walks around the perimeter.", comments: [{ user: "YorksBream", date: "5 days ago", rating: 4, text: "Method feeder session yesterday. 8 bream from 3lb to 6lb 8oz in 4 hours. Classic reservoir fishing. The fish are well away from the bank so a long cast is essential." }, { user: "NorthernLad", date: "2 weeks ago", rating: 5, text: "Yorkshire's best kept secret. Beautiful bream to nearly 10lb last weekend on the open-end feeder. Barely anyone on the bank — absolute pleasure." }] },
    { id: 16, name: "Rother Valley Country Park", town: "Maltby, Rotherham", type: "Lake Complex", pegs: 65, species: ["Carp", "Roach", "Perch", "Bream", "Pike"], dayTicket: "£6", eveningTicket: null, nightFishing: false, rating: 4.0, reviews: 34, campsite: "Rother Valley Park Lodges", campsiteDistance: "On site", campsitePrice: "£25/night", facilities: ["Visitor centre", "Restaurant", "Watersports centre", "Full toilet facilities"], rules: ["Day tickets from visitor centre", "No fishing certain areas", "Barbless only on match lakes"], season: "Open all year", recordFish: "Carp 28lb 14oz", description: "A country park on the former Thurcroft Colliery site that has been transformed into a thriving watersports and fishing destination. The lakes offer good mixed coarse fishing and the carp lake holds fish to nearly 30lb. A popular family destination that balances fishing with watersports and leisure.", comments: [{ user: "SouthYorksAngler", date: "1 week ago", rating: 4, text: "Good session on the carp lake. Three fish to 18lb on pop-ups. It's busy at weekends but midweek you can often get a good peg to yourself." }] },
  ],
  "North West": [
    { id: 17, name: "Pennington Flash", town: "Leigh, Greater Manchester", type: "Flash Lake", pegs: 55, species: ["Bream", "Tench", "Carp", "Roach", "Pike", "Perch"], dayTicket: "£6", eveningTicket: null, nightFishing: false, rating: 4.2, reviews: 48, campsite: "Leigh Sports Village", campsiteDistance: "2.1 miles", campsitePrice: "£18/night", facilities: ["Large car park", "Toilets", "Nature reserve", "SSSI designation"], rules: ["No fishing certain conservation areas", "EA licence required", "No bait boats"], season: "Open all year on fishing areas", recordFish: "Bream 12lb 7oz", description: "A large subsidence flash lake on the edge of Leigh offering some of Greater Manchester's finest coarse fishing. Pennington Flash is an SSSI nature reserve and the birdwatching is outstanding — but the fishing matches the wildlife. Enormous bream shoals patrol the open water and the tench fishing in May and June is exceptional. A true jewel of the North West.", comments: [{ user: "MancsAngler", date: "3 days ago", rating: 5, text: "The bream are absolute slabs here. Best 12lb last weekend on the method feeder at range. Don't underestimate how big this lake is — use a marker float to find the right depth and distance." }, { user: "NorthWestNed", date: "1 week ago", rating: 4, text: "Tench session on the south bank. Seven fish best 6lb 3oz on worm and corn over groundbait. The nature reserve makes it genuinely special — had an osprey circle overhead mid-morning." }] },
    { id: 18, name: "Rivington Reservoir", town: "Horwich, Bolton", type: "Reservoir", pegs: 35, species: ["Trout", "Perch", "Roach", "Pike"], dayTicket: "£18 (fly only)", eveningTicket: "£12", nightFishing: false, rating: 4.4, reviews: 29, campsite: "Rivington Camping", campsiteDistance: "1.8 miles", campsitePrice: "£15/night", facilities: ["Car park", "Visitor centre", "Toilets", "Scenic views to Rivington Pike"], rules: ["Fly fishing only", "Barbless hooks", "Maximum 4 fish limit", "All browns to be returned"], season: "March–October", recordFish: "Brown Trout 7lb 14oz", description: "Set beneath the impressive Rivington Pike hill fort, Rivington Reservoir is one of Lancashire's most scenic fishing venues. The fly-only reservoir is stocked with quality rainbow trout and holds some large wild brown trout. The surrounding moorland landscape makes every session feel like a genuine wilderness experience despite being close to Bolton.", comments: [{ user: "FlyFisherNorth", date: "4 days ago", rating: 5, text: "Stunning location and great fishing. Three rainbows on a PTN nymph fished slowly along the dam wall. The views from the top bank are incredible." }] },
  ],
};

const allRegions = Object.keys(directoryData);
const ratingColor = (r) => r === "Excellent" ? theme.excellent : r === "Good" ? theme.good : r === "Fair" ? theme.fair : theme.poor;
const ScoreBar = ({ score }) => (
  <div style={{ background: theme.border, borderRadius: 4, height: 6, width: "100%", margin: "6px 0" }}>
    <div style={{ background: ratingColor(score >= 8 ? "Excellent" : score >= 6 ? "Good" : score >= 4 ? "Fair" : "Poor"), width: `${score * 10}%`, height: "100%", borderRadius: 4, transition: "width 0.6s ease" }} />
  </div>
);
const Badge = ({ text, color }) => (
  <span style={{ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600, letterSpacing: 0.5 }}>{text}</span>
);

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color: theme.warning, fontSize: 13 }}>
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
      <span style={{ color: theme.textMuted, fontSize: 12, marginLeft: 4 }}>{rating}</span>
    </span>
  );
};

function SiteDetailModal({ site, onClose }) {
  const [activeTab, setActiveTab] = useState("info");
  const tabs = ["info", "rules", "campsite", "comments"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000cc", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 700, maxHeight: "90vh", overflowY: "auto", animation: "slideUp 0.3s ease" }}>

        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${theme.accentDim}33, ${theme.waterDim}22)`, padding: "20px 24px 16px", borderBottom: `1px solid ${theme.border}`, position: "sticky", top: 0, backdropFilter: "blur(10px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, fontFamily: "'Playfair Display', serif" }}>{site.name}</div>
              <div style={{ color: theme.textMuted, fontSize: 13, marginTop: 3 }}>📍 {site.town}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                <StarRating rating={site.rating} />
                <span style={{ color: theme.textMuted, fontSize: 12 }}>{site.reviews} reviews</span>
                <Badge text={site.type} color={theme.water} />
              </div>
            </div>
            <button onClick={onClose} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: "50%", width: 36, height: 36, color: theme.textMuted, cursor: "pointer", fontSize: 18, fontFamily: "inherit" }}>×</button>
          </div>

          {/* Quick stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 14 }}>
            {[
              { label: "Pegs", value: site.pegs, icon: "🎣" },
              { label: "Day Ticket", value: site.dayTicket, icon: "🎟️" },
              { label: "Night Fishing", value: site.nightFishing ? "✓ Yes" : "✗ No", icon: "🌙" },
              { label: "Season", value: site.season.includes("all") ? "All Year" : "Seasonal", icon: "📅" },
            ].map((s, i) => (
              <div key={i} style={{ background: theme.surface, borderRadius: 10, padding: "8px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 14 }}>{s.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: s.label === "Night Fishing" ? (site.nightFishing ? theme.accent : theme.danger) : theme.accent, marginTop: 2 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Sub tabs */}
          <div style={{ display: "flex", gap: 0, marginTop: 14 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{ background: "none", border: "none", borderBottom: `2px solid ${activeTab === t ? theme.accent : "transparent"}`, color: activeTab === t ? theme.accent : theme.textMuted, padding: "8px 14px", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600, textTransform: "capitalize", transition: "all 0.2s" }}>
                {t === "info" ? "ℹ️ Info" : t === "rules" ? "📋 Rules" : t === "campsite" ? "⛺ Campsite" : `💬 Reviews (${site.comments.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{ padding: 24 }}>

          {activeTab === "info" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ color: theme.textMuted, fontSize: 14, lineHeight: 1.8 }}>{site.description}</p>

              <div>
                <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>🐟 FISH SPECIES</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {site.species.map((s, i) => <Badge key={i} text={s} color={theme.accent} />)}
                </div>
              </div>

              <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 11, color: theme.warning, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>🏆 VENUE RECORDS</div>
                <div style={{ color: theme.text, fontWeight: 600 }}>{site.recordFish}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>🏕️ FACILITIES</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {site.facilities.map((f, i) => <Badge key={i} text={f} color={theme.water} />)}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: 14 }}>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 4 }}>🎟️ Day Ticket</div>
                  <div style={{ color: theme.accent, fontWeight: 700, fontSize: 18 }}>{site.dayTicket}</div>
                </div>
                {site.eveningTicket && (
                  <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: 14 }}>
                    <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 4 }}>🌅 Evening Ticket</div>
                    <div style={{ color: theme.good, fontWeight: 700, fontSize: 18 }}>{site.eveningTicket}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "rules" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>📋 FISHING RULES</div>
              {site.rules.map((r, i) => (
                <div key={i} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: theme.warning, fontSize: 16 }}>⚠️</span>
                  <span style={{ color: theme.text, fontSize: 14 }}>{r}</span>
                </div>
              ))}
              <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 16 }}>📅</span>
                <div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 2 }}>FISHING SEASON</div>
                  <div style={{ color: theme.text, fontSize: 14, fontWeight: 600 }}>{site.season}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "campsite" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: `linear-gradient(135deg, ${theme.waterDim}22, ${theme.accentDim}11)`, border: `1px solid ${theme.water}44`, borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 4, fontFamily: "'Playfair Display', serif" }}>⛺ {site.campsite}</div>
                <div style={{ color: theme.textMuted, fontSize: 13, marginBottom: 12 }}>📏 {site.campsiteDistance} from venue</div>
                <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: theme.accent }}>{site.campsitePrice}</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>🏕️ CAMPSITE FACILITIES</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {site.facilities.map((f, i) => <Badge key={i} text={f} color={theme.water} />)}
                </div>
              </div>
              <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: 16, marginTop: 4 }}>
                <div style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7 }}>💡 <strong style={{ color: theme.text }}>Tip:</strong> Book campsites in advance for May–September weekends. Most venues within 5 miles of quality fisheries fill up fast, especially on match weekends.</div>
              </div>
            </div>
          )}

          {activeTab === "comments" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1 }}>MEMBER REVIEWS</div>
                <StarRating rating={site.rating} />
              </div>
              {site.comments.map((c, i) => (
                <div key={i} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: theme.accent + "33", border: `1px solid ${theme.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎣</div>
                      <div>
                        <div style={{ fontWeight: 700, color: theme.text, fontSize: 14 }}>{c.user}</div>
                        <div style={{ fontSize: 11, color: theme.textMuted }}>{c.date}</div>
                      </div>
                    </div>
                    <span style={{ color: theme.warning }}>{"★".repeat(c.rating)}</span>
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{c.text}</p>
                </div>
              ))}
              <div style={{ background: theme.surfaceAlt, border: `2px dashed ${theme.border}`, borderRadius: 14, padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>✍️</div>
                <div style={{ color: theme.textMuted, fontSize: 14, marginBottom: 12 }}>Have you fished here? Leave a review for other members.</div>
                <button style={{ background: theme.accent, color: "#000", border: "none", borderRadius: 10, padding: "10px 24px", fontFamily: "inherit", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Write a Review</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const MAKE_WEBHOOK = "https://hook.eu1.make.com/e4rif83s57n7gcapxymbc75vydg2oaa5";

const venueTypes = ["Lake", "River", "Canal", "Reservoir", "Commercial Lake", "Estate Lake", "Lake Complex", "Flash Lake", "Fly Only"];
const ukRegions  = ["East Midlands", "East of England", "London", "North East", "North West", "South East", "South West", "West Midlands", "Yorkshire", "Wales", "Scotland", "Northern Ireland"];
const speciesList = ["Carp", "Tench", "Bream", "Roach", "Perch", "Pike", "Barbel", "Chub", "Trout", "F1 Carp", "Ide", "Rudd", "Crucian Carp", "Catfish", "Zander", "Dace", "Grayling"];
const facilitiesList = ["Car park", "Toilets", "Showers", "Café", "Tackle shop", "Disabled access", "Disabled pegs", "Electric hookup", "Camping on site", "Lodges", "Bait available"];

function VenueSubmitModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    venueName: "", town: "", region: "", postcode: "", type: "",
    numberOfPegs: "", species: [], dayTicketPrice: "", nightFishing: false,
    facilities: [], rules: "", campsiteNearby: "", description: "", submittedBy: "",
  });

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const toggleArr = (field, val) => setForm(prev => ({ ...prev, [field]: prev[field].includes(val) ? prev[field].filter(x => x !== val) : [...prev[field], val] }));

  const submit = async () => {
    setStatus("loading");
    try {
      const res = await fetch(MAKE_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "Venue Name":                    form.venueName,
          "Town":                          form.town,
          "Region":                        form.region,
          "Postcode":                      form.postcode,
          "Type (Lake, River, Canal etc)": form.type,
          "Number of Pegs":                parseInt(form.numberOfPegs) || 0,
          "Fish Species":                  form.species.join(", "),
          "Day Ticket Price":              form.dayTicketPrice,
          "Night Fishing":                 form.nightFishing,
          "Facilities":                    form.facilities.join(", "),
          "Rules":                         form.rules,
          "Campsite Nearby":               form.campsiteNearby,
          "Description":                   form.description,
          "Submitted by":                  form.submittedBy,
          "Status":                        "Pending",
          "Submission Date":               new Date().toISOString().split("T")[0],
        })
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inp = { background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 14px", color: theme.text, fontSize: 14, fontFamily: "inherit", outline: "none", width: "100%" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#000000cc", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 700, maxHeight: "90vh", overflowY: "auto" }}>

        {/* Header */}
        <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: theme.surface, zIndex: 1 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: theme.text, fontFamily: "'Playfair Display', serif" }}>Add a Venue</div>
            <div style={{ fontSize: 12, color: theme.textMuted }}>Step {step} of 3 — {step === 1 ? "Basic Details" : step === 2 ? "Species & Facilities" : "Description & Submit"}</div>
          </div>
          <button onClick={onClose} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: "50%", width: 36, height: 36, color: theme.textMuted, cursor: "pointer", fontSize: 18, fontFamily: "inherit" }}>×</button>
        </div>

        <div style={{ padding: 24 }}>

          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎣</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: theme.accent, fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>Venue Submitted!</div>
              <div style={{ color: theme.textMuted, fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>Thank you for adding this venue. It will be reviewed and added to the directory shortly.</div>
              <button onClick={onClose} style={{ background: theme.accent, color: "#000", border: "none", borderRadius: 12, padding: "12px 32px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 14 }}>Done</button>
            </div>
          ) : status === "error" ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
              <div style={{ color: theme.danger, fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Submission Failed</div>
              <div style={{ color: theme.textMuted, fontSize: 14, marginBottom: 24 }}>Something went wrong. Please try again.</div>
              <button onClick={() => setStatus("idle")} style={{ background: theme.accent, color: "#000", border: "none", borderRadius: 12, padding: "12px 32px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 14 }}>Try Again</button>
            </div>
          ) : (
            <>
              {/* Step 1 — Basic Details */}
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>VENUE NAME *</div>
                    <input value={form.venueName} onChange={e => set("venueName", e.target.value)} placeholder="e.g. Lechlade & Bushyleaze" style={inp} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>TOWN *</div>
                      <input value={form.town} onChange={e => set("town", e.target.value)} placeholder="e.g. Lechlade-on-Thames" style={inp} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>POSTCODE</div>
                      <input value={form.postcode} onChange={e => set("postcode", e.target.value)} placeholder="e.g. GL7 3HG" style={inp} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>REGION *</div>
                    <select value={form.region} onChange={e => set("region", e.target.value)} style={{ ...inp }}>
                      <option value="">Select region...</option>
                      {ukRegions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>VENUE TYPE *</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {venueTypes.map(t => (
                        <button key={t} onClick={() => set("type", t)} style={{ background: form.type === t ? theme.accent + "33" : theme.surfaceAlt, color: form.type === t ? theme.accent : theme.textMuted, border: `1px solid ${form.type === t ? theme.accent : theme.border}`, borderRadius: 20, padding: "5px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600 }}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>NUMBER OF PEGS</div>
                      <input type="number" value={form.numberOfPegs} onChange={e => set("numberOfPegs", e.target.value)} placeholder="e.g. 30" style={inp} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>DAY TICKET PRICE</div>
                      <input value={form.dayTicketPrice} onChange={e => set("dayTicketPrice", e.target.value)} placeholder="e.g. £10" style={inp} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, background: theme.surfaceAlt, borderRadius: 10, padding: "12px 16px" }}>
                    <input type="checkbox" id="nightfishing" checked={form.nightFishing} onChange={e => set("nightFishing", e.target.checked)} style={{ width: 18, height: 18, cursor: "pointer" }} />
                    <label htmlFor="nightfishing" style={{ color: theme.text, fontSize: 14, cursor: "pointer" }}>Night fishing available</label>
                  </div>
                </div>
              )}

              {/* Step 2 — Species & Facilities */}
              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>FISH SPECIES — tick all that apply</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {speciesList.map(s => (
                        <button key={s} onClick={() => toggleArr("species", s)} style={{ background: form.species.includes(s) ? theme.water + "33" : theme.surfaceAlt, color: form.species.includes(s) ? theme.water : theme.textMuted, border: `1px solid ${form.species.includes(s) ? theme.water : theme.border}`, borderRadius: 20, padding: "5px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600 }}>{s}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>FACILITIES — tick all that apply</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {facilitiesList.map(f => (
                        <button key={f} onClick={() => toggleArr("facilities", f)} style={{ background: form.facilities.includes(f) ? theme.accentDim + "44" : theme.surfaceAlt, color: form.facilities.includes(f) ? theme.accent : theme.textMuted, border: `1px solid ${form.facilities.includes(f) ? theme.accent : theme.border}`, borderRadius: 20, padding: "5px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600 }}>{f}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>NEAREST CAMPSITE (optional)</div>
                    <input value={form.campsiteNearby} onChange={e => set("campsiteNearby", e.target.value)} placeholder="e.g. Riverside Camping, 0.5 miles" style={inp} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>RULES (optional)</div>
                    <textarea value={form.rules} onChange={e => set("rules", e.target.value)} placeholder="e.g. Barbless hooks only, no bait boats, unhooking mats required..." rows={3} style={{ ...inp, resize: "vertical" }} />
                  </div>
                </div>
              )}

              {/* Step 3 — Description & Submit */}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>VENUE DESCRIPTION *</div>
                    <textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Tell other anglers about this venue — what makes it special, best swims, tips for first timers..." rows={6} style={{ ...inp, resize: "vertical" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>YOUR NAME / USERNAME</div>
                    <input value={form.submittedBy} onChange={e => set("submittedBy", e.target.value)} placeholder="e.g. CarpKing_Dave" style={inp} />
                  </div>
                  <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: 16, fontSize: 13, color: theme.textMuted, lineHeight: 1.6 }}>
                    Your submission will be reviewed before appearing in the directory. Thank you for helping build the UK's best fishing venue database.
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                {step > 1 && <button onClick={() => setStep(step - 1)} style={{ flex: 1, background: "none", border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px", color: theme.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>← Back</button>}
                {step < 3 && (
                  <button onClick={() => setStep(step + 1)} disabled={step === 1 && (!form.venueName || !form.region || !form.type)}
                    style={{ flex: 2, background: step === 1 && (!form.venueName || !form.region || !form.type) ? theme.border : theme.accent, color: step === 1 && (!form.venueName || !form.region || !form.type) ? theme.textMuted : "#000", border: "none", borderRadius: 12, padding: "14px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 14 }}>
                    Next →
                  </button>
                )}
                {step === 3 && (
                  <button onClick={submit} disabled={!form.description || status === "loading"}
                    style={{ flex: 2, background: !form.description || status === "loading" ? theme.border : theme.accent, color: !form.description || status === "loading" ? theme.textMuted : "#000", border: "none", borderRadius: 12, padding: "14px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 14 }}>
                    {status === "loading" ? "Submitting..." : "Submit Venue →"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DirectoryTab() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedSite, setSelectedSite] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [showSubmit, setShowSubmit] = useState(false);

  const allSites = Object.entries(directoryData).flatMap(([region, sites]) =>
    sites.map(s => ({ ...s, region }))
  );

  const types = ["All", ...new Set(allSites.map(s => s.type))];

  const filtered = allSites.filter(s => {
    const matchRegion = selectedRegion === "All" || s.region === selectedRegion;
    const matchType = filterType === "All" || s.type === filterType;
    const matchSearch = search === "" || s.name.toLowerCase().includes(search.toLowerCase()) || s.town.toLowerCase().includes(search.toLowerCase()) || s.species.some(sp => sp.toLowerCase().includes(search.toLowerCase()));
    return matchRegion && matchType && matchSearch;
  });

  const byRegion = selectedRegion === "All"
    ? Object.fromEntries(allRegions.map(r => [r, filtered.filter(s => s.region === r)]).filter(([, v]) => v.length > 0))
    : { [selectedRegion]: filtered };

  return (
    <div>
      {selectedSite && <SiteDetailModal site={selectedSite} onClose={() => setSelectedSite(null)} />}
      {showSubmit && <VenueSubmitModal onClose={() => setShowSubmit(false)} />}

      {/* Add venue banner */}
      <div style={{ background: `linear-gradient(135deg, ${theme.accentDim}22, ${theme.waterDim}11)`, border: `1px solid ${theme.accent}44`, borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div>
          <div style={{ fontWeight: 700, color: theme.text, fontSize: 15, marginBottom: 2 }}>Know a venue that's missing?</div>
          <div style={{ fontSize: 13, color: theme.textMuted }}>Help build the UK's most complete fishing venue directory</div>
        </div>
        <button onClick={() => setShowSubmit(true)} style={{ background: theme.accent, color: "#000", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", flexShrink: 0 }}>+ Add a Venue</button>
      </div>

      {/* Search & filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search venues, towns, species..." style={{ flex: 1, minWidth: 200, background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 14px", color: theme.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
      </div>

      {/* Region filters */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 14 }}>
        {["All", ...allRegions].map(r => (
          <button key={r} onClick={() => setSelectedRegion(r)} style={{ background: selectedRegion === r ? theme.accent : theme.surfaceAlt, color: selectedRegion === r ? "#000" : theme.textMuted, border: `1px solid ${selectedRegion === r ? theme.accent : theme.border}`, borderRadius: 20, padding: "6px 14px", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", transition: "all 0.2s" }}>
            {r}
          </button>
        ))}
      </div>

      {/* Type filters */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>
        {types.map(t => (
          <button key={t} onClick={() => setFilterType(t)} style={{ background: filterType === t ? theme.water + "33" : "transparent", color: filterType === t ? theme.water : theme.textMuted, border: `1px solid ${filterType === t ? theme.water : theme.border}`, borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", transition: "all 0.2s" }}>
            {t}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 16 }}>
        Showing <strong style={{ color: theme.accent }}>{filtered.length}</strong> venues across <strong style={{ color: theme.accent }}>{Object.keys(byRegion).length}</strong> regions
      </div>

      {/* Sites by region */}
      {Object.entries(byRegion).map(([region, sites]) => sites.length > 0 && (
        <div key={region} style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, flex: 0, width: 3, background: theme.accent, borderRadius: 2 }} />
            <div style={{ fontSize: 13, fontWeight: 800, color: theme.accent, letterSpacing: 1, textTransform: "uppercase" }}>{region}</div>
            <div style={{ flex: 1, height: 1, background: theme.border }} />
            <div style={{ fontSize: 12, color: theme.textMuted }}>{sites.length} venue{sites.length > 1 ? "s" : ""}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sites.map((site, i) => (
              <div key={i} onClick={() => setSelectedSite(site)} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18, cursor: "pointer", transition: "all 0.2s", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, color: theme.text, fontSize: 15 }}>{site.name}</span>
                    <Badge text={site.type} color={theme.water} />
                    {site.nightFishing && <Badge text="Night ✓" color={theme.accentDim} />}
                  </div>
                  <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8 }}>📍 {site.town} · {site.pegs} pegs</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {site.species.slice(0, 4).map((s, j) => <Badge key={j} text={s} color={theme.accentDim} />)}
                    {site.species.length > 4 && <span style={{ color: theme.textMuted, fontSize: 11 }}>+{site.species.length - 4} more</span>}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: theme.accent }}>{site.dayTicket}</div>
                  <div style={{ fontSize: 10, color: theme.textMuted, marginBottom: 6 }}>day ticket</div>
                  <StarRating rating={site.rating} />
                  <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 2 }}>{site.reviews} reviews</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── SPOTS TAB (kept for Trip Planner compatibility) ──────────────────────────
const spotsData = [
  { name: "Farmoor Reservoir", region: "Oxfordshire", type: "Reservoir", species: ["Trout", "Pike", "Perch"], dayTicket: "£15/day", rating: 4.6, distance: "2.1 miles to campsite", campsite: "Farmoor Camping & Caravanning", campsitePrice: "£18/night", facilities: ["Electric hookup", "Showers", "Toilets"], notes: "Excellent early morning trout fishing. Bank access all year." },
  { name: "Lechlade & Bushyleaze", region: "Gloucestershire", type: "Lake", species: ["Carp", "Tench", "Bream"], dayTicket: "£12/day", rating: 4.8, distance: "0.5 miles to campsite", campsite: "Lechlade on Thames Leisure", campsitePrice: "£22/night", facilities: ["Riverside pitches", "Showers", "Shop"], notes: "Stunning Cotswolds setting. Large carp to 40lb+." },
  { name: "Oxford Canal — Cropredy", region: "Oxfordshire", type: "Canal", species: ["Roach", "Perch", "Bream", "Pike"], dayTicket: "EA Licence only", rating: 4.2, distance: "1.2 miles to campsite", campsite: "Cropredy Marina Campsite", campsitePrice: "£14/night", facilities: ["Basic", "Toilets"], notes: "Classic canal fishing. Free with EA rod licence. Great for beginners." },
  { name: "Ashmead Lake", region: "Warwickshire", type: "Commercial", species: ["Carp", "F1s", "Ide"], dayTicket: "£10/day", rating: 4.4, distance: "3.4 miles to campsite", campsite: "Warwick Racecourse Camping", campsitePrice: "£20/night", facilities: ["Full facilities", "Electric hookup"], notes: "Well stocked commercial venue. Perfect for match fishing." },
  { name: "Clattercote Reservoir", region: "Oxfordshire", type: "Reservoir", species: ["Bream", "Tench", "Roach", "Carp"], dayTicket: "£8/day", rating: 4.1, distance: "1.8 miles to campsite", campsite: "Clattercote Farm Camping", campsitePrice: "£12/night", facilities: ["Basic", "Water", "Fire pits"], notes: "Hidden gem. Outstanding bream fishing in summer months." },
];

function TripPlannerTab() {
  const [step, setStep] = useState(1);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [nights, setNights] = useState(1);
  const [tripPlan, setTripPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedTrips, setSavedTrips] = useState([]);

  const spot = selectedSpot !== null ? spotsData[selectedSpot] : null;
  const day = selectedDay !== null ? forecastData[selectedDay] : null;
  const totalCost = spot && day ? (parseFloat(spot.dayTicket.replace(/[^0-9.]/g, "") || 0) * (nights + 1)) + (parseFloat(spot.campsitePrice.replace(/[^0-9.]/g, "") || 0) * nights) : 0;

  const generatePlan = async () => {
    if (!spot || !day) return;
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are an expert UK fishing trip planner. Generate concise, practical trip plans for UK anglers. Always include: arrival timing advice, session plan by time of day, top 3 bait/rig recommendations for the conditions, essential kit checklist (8-10 items), one local tip. Be specific and practical. Format with clear sections using emoji headers. Keep total response under 400 words.",
          messages: [{ role: "user", content: `Plan a ${nights}-night fishing trip to ${spot.name} in ${spot.region}. Fishing day: ${day.day} (${day.date}). Conditions: ${day.rating} (${day.score}/10). Pressure: ${day.pressure}. Wind: ${day.wind}. Temp: ${day.temp}. Water temp: ${day.waterTemp}. Best fishing windows: ${day.bestTime}. Target species: ${day.species.join(", ") || "General coarse"}. Recommended bait: ${day.bait}. Venue notes: ${spot.notes} Campsite: ${spot.campsite}, ${spot.distance} from venue. Give me a complete trip plan including arrival strategy, session timetable, rig/bait setup, and kit checklist.` }]
        })
      });
      const data = await response.json();
      setTripPlan(data.content?.[0]?.text || "Unable to generate plan.");
      setStep(4);
    } catch { setTripPlan("Connection error. Please try again."); setStep(4); }
    setLoading(false);
  };

  const saveTrip = () => {
    if (!spot || !day) return;
    setSavedTrips(prev => [...prev, { spot: spot.name, date: day.date, nights, score: day.score, status: "Planned" }]);
    setStep(1); setSelectedSpot(null); setSelectedDay(null); setNights(1); setTripPlan(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {savedTrips.length > 0 && (
        <div>
          <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>📅 YOUR TRIPS</div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {savedTrips.map((t, i) => (
              <div key={i} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 16px", minWidth: 200, flexShrink: 0 }}>
                <div style={{ fontWeight: 700, color: theme.text, fontSize: 14, marginBottom: 4 }}>{t.spot}</div>
                <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8 }}>{t.date} · {t.nights} night{t.nights > 1 ? "s" : ""}</div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Badge text={t.status} color={t.status === "Upcoming" ? theme.water : theme.accent} />
                  <span style={{ fontSize: 12, color: ratingColor(t.score >= 8 ? "Excellent" : t.score >= 6 ? "Good" : t.score >= 4 ? "Fair" : "Poor"), fontWeight: 700 }}>{t.score}/10</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {["Choose Spot", "Pick Date", "Nights & Cost", "Trip Plan"].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: step > i + 1 ? theme.accent : step === i + 1 ? theme.accent + "33" : theme.border, border: `2px solid ${step >= i + 1 ? theme.accent : theme.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: step > i + 1 ? "#000" : step === i + 1 ? theme.accent : theme.textMuted, transition: "all 0.3s" }}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <div style={{ fontSize: 10, color: step === i + 1 ? theme.accent : theme.textMuted, fontWeight: step === i + 1 ? 700 : 400, whiteSpace: "nowrap" }}>{s}</div>
            </div>
            {i < 3 && <div style={{ height: 2, flex: 1, background: step > i + 1 ? theme.accent : theme.border, margin: "0 4px", marginBottom: 18, transition: "all 0.3s" }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 14, fontFamily: "'Playfair Display', serif" }}>Where do you want to fish?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {spotsData.map((s, i) => (
              <div key={i} onClick={() => { setSelectedSpot(i); setStep(2); }} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18, cursor: "pointer", transition: "all 0.2s", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><div style={{ fontWeight: 700, color: theme.text, marginBottom: 4 }}>{s.name}</div><div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8 }}>📍 {s.region} · {s.type}</div><div style={{ display: "flex", gap: 6 }}>{s.species.slice(0, 3).map((sp, j) => <Badge key={j} text={sp} color={theme.accentDim} />)}</div></div>
                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}><div style={{ color: theme.accent, fontWeight: 700 }}>⭐ {s.rating}</div><div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>{s.dayTicket}</div><div style={{ fontSize: 12, color: theme.textMuted }}>⛺ {s.campsitePrice}</div></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && spot && (
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>When are you going to {spot.name}?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {forecastData.map((d, i) => (
              <div key={i} onClick={() => { setSelectedDay(i); setStep(3); }} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: ratingColor(d.rating) + "22", border: `1px solid ${ratingColor(d.rating)}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: ratingColor(d.rating) }}>{d.score}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontWeight: 700, color: theme.text }}>{d.day} — {d.date}</span><Badge text={d.rating} color={ratingColor(d.rating)} /></div>
                  <div style={{ fontSize: 12, color: theme.textMuted }}>⏰ {d.bestTime}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setStep(1)} style={{ marginTop: 14, background: "none", border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 20px", color: theme.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>← Back</button>
        </div>
      )}

      {step === 3 && spot && day && (
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>How many nights?</div>
          <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}><div><div style={{ fontWeight: 700, color: theme.text }}>{spot.name}</div><div style={{ color: theme.textMuted, fontSize: 13 }}>{day.day}, {day.date}</div></div><Badge text={day.rating} color={ratingColor(day.rating)} /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: theme.textMuted }}>Nights camping:</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => setNights(Math.max(1, nights - 1))} style={{ width: 32, height: 32, borderRadius: "50%", background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text, cursor: "pointer", fontSize: 18, fontFamily: "inherit" }}>−</button>
                <span style={{ fontSize: 20, fontWeight: 700, color: theme.accent, minWidth: 24, textAlign: "center" }}>{nights}</span>
                <button onClick={() => setNights(Math.min(7, nights + 1))} style={{ width: 32, height: 32, borderRadius: "50%", background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text, cursor: "pointer", fontSize: 18, fontFamily: "inherit" }}>+</button>
              </div>
            </div>
            <div style={{ background: theme.surface, borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>💷 ESTIMATED COST</div>
              {[{ label: `Day tickets (${nights + 1} days)`, value: `£${(parseFloat(spot.dayTicket.replace(/[^0-9.]/g, "") || 0) * (nights + 1)).toFixed(2)}` }, { label: `Campsite (${nights} night${nights > 1 ? "s" : ""})`, value: `£${(parseFloat(spot.campsitePrice.replace(/[^0-9.]/g, "") || 0) * nights).toFixed(2)}` }].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}><span style={{ color: theme.textMuted }}>{row.label}</span><span style={{ color: theme.text, fontWeight: 600 }}>{row.value}</span></div>
              ))}
              <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 10, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, color: theme.text }}>Total</span>
                <span style={{ fontWeight: 900, color: theme.accent, fontSize: 18 }}>£{totalCost.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, background: "none", border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px", color: theme.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>← Back</button>
            <button onClick={generatePlan} disabled={loading} style={{ flex: 2, background: loading ? theme.border : theme.accent, color: loading ? theme.textMuted : "#000", border: "none", borderRadius: 12, padding: "14px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 700 }}>
              {loading ? "⏳ Generating plan..." : "🗺️ Generate AI Trip Plan →"}
            </button>
          </div>
        </div>
      )}

      {step === 4 && tripPlan && spot && day && (
        <div>
          <div style={{ background: `linear-gradient(135deg, ${theme.accentDim}22, ${theme.waterDim}22)`, border: `1px solid ${theme.accent}44`, borderRadius: 16, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: theme.accent, fontWeight: 700, letterSpacing: 1 }}>🗺️ YOUR TRIP PLAN</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: theme.text, fontFamily: "'Playfair Display', serif", marginTop: 4 }}>{spot.name}</div>
            <div style={{ fontSize: 13, color: theme.textMuted }}>{day.day}, {day.date} · {nights} night{nights > 1 ? "s" : ""} · Est. £{totalCost.toFixed(2)}</div>
          </div>
          <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 20, whiteSpace: "pre-wrap", fontSize: 14, color: theme.text, lineHeight: 1.8, marginBottom: 16 }}>{tripPlan}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { setStep(1); setSelectedSpot(null); setSelectedDay(null); setNights(1); setTripPlan(null); }} style={{ flex: 1, background: "none", border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px", color: theme.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>Plan New Trip</button>
            <button onClick={saveTrip} style={{ flex: 2, background: theme.accent, color: "#000", border: "none", borderRadius: 12, padding: "14px", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 700 }}>✓ Save This Trip</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ChatTab() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hello, I'm your Reel Big Fish AI fishing guide. Ask me anything — species identification, bait selection, tackle setup, UK fishing regulations, best techniques, or advice on any of our listed spots. What would you like to know?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages); setInput(""); setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: "You are an expert UK fishing guide and advisor for Reel Big Fish, a premium UK fishing membership. You have deep knowledge of UK freshwater and sea fishing species, techniques, bait selection, tackle setup, EA regulations, river and lake reading, weather effects on fish behaviour, UK fishing venues, and overnight fishing advice. Be passionate, practical and concise. Give actionable advice. Speak like an experienced angler.", messages: newMessages.map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content?.[0]?.text || "Sorry, couldn't get a response." }]);
    } catch { setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please try again." }]); }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: 520 }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 0", display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "assistant" && <div style={{ width: 32, height: 32, borderRadius: "50%", background: theme.accent + "33", border: `1px solid ${theme.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 10, flexShrink: 0, marginTop: 4, fontSize: 16 }}>🎣</div>}
            <div style={{ maxWidth: "75%", background: m.role === "user" ? theme.accent : theme.surfaceAlt, color: m.role === "user" ? "#000" : theme.text, borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "12px 16px", fontSize: 14, lineHeight: 1.6, border: m.role === "assistant" ? `1px solid ${theme.border}` : "none", fontWeight: m.role === "user" ? 600 : 400 }}>{m.content}</div>
          </div>
        ))}
        {loading && <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 32, height: 32, borderRadius: "50%", background: theme.accent + "33", border: `1px solid ${theme.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎣</div><div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: "18px 18px 18px 4px", padding: "12px 20px" }}><div style={{ display: "flex", gap: 4 }}>{[0,1,2].map(j => <div key={j} style={{ width: 6, height: 6, borderRadius: "50%", background: theme.accent, animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${j*0.2}s` }} />)}</div></div></div>}
        <div ref={bottomRef} />
      </div>
      {messages.length === 1 && <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "12px 0" }}>{["Best bait for carp in May?", "How do I read a river for pike?", "What EA licence do I need?", "Best float setup for roach?"].map((s, i) => <button key={i} onClick={() => setInput(s)} style={{ background: theme.surfaceAlt, color: theme.textMuted, border: `1px solid ${theme.border}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{s}</button>)}</div>}
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask anything about fishing..." style={{ flex: 1, background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 16px", color: theme.text, fontSize: 14, fontFamily: "inherit", outline: "none" }} />
        <button onClick={send} disabled={loading || !input.trim()} style={{ background: loading || !input.trim() ? theme.border : theme.accent, color: loading || !input.trim() ? theme.textMuted : "#000", border: "none", borderRadius: 12, padding: "12px 20px", cursor: loading || !input.trim() ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 14, fontFamily: "inherit" }}>Cast →</button>
      </div>
    </div>
  );
}

// ── FISHING SCORE ENGINE ────────────────────────────────────────────────────
function calcFishingScore(day) {
  let score = 5.0;
  // Temperature (coarse fishing sweet spot 10–18°C)
  const t = day.temp;
  if (t >= 12 && t <= 17) score += 2.0;
  else if (t >= 9 && t <= 20) score += 1.0;
  else if (t < 5 || t > 24) score -= 2.0;
  else score -= 0.5;
  // Wind (calm = better)
  const w = day.windspeed;
  if (w < 10) score += 1.5;
  else if (w < 20) score += 0.5;
  else if (w < 30) score -= 1.0;
  else score -= 2.5;
  // Rain (light = ok, heavy = bad)
  const r = day.rain;
  if (r === 0) score += 0.5;
  else if (r < 3) score += 0.2;
  else if (r < 8) score -= 1.0;
  else score -= 2.5;
  // Pressure trend
  if (day.pressureTrend === "Rising") score += 1.2;
  else if (day.pressureTrend === "Stable") score += 0.4;
  else score -= 1.0;
  // Cloud cover (overcast often good for fishing)
  const c = day.cloud;
  if (c > 60 && c < 90) score += 0.3;
  return Math.min(10, Math.max(1, Math.round(score * 10) / 10));
}

function getRating(score) {
  if (score >= 8) return "Excellent";
  if (score >= 6.5) return "Good";
  if (score >= 4.5) return "Fair";
  return "Poor";
}

function getBestWindows(score, sunrise, sunset) {
  if (score < 4) return "Not recommended — conditions poor";
  if (score >= 8) return `Dawn (${sunrise}) & Dusk (${sunset}) — all day viable`;
  if (score >= 6.5) return `${sunrise} – ${String(parseInt(sunrise)+3).padStart(2,"0")}:00 & ${String(parseInt(sunset)-2).padStart(2,"0")}:00 – ${sunset}`;
  return `${String(parseInt(sunrise)+1).padStart(2,"0")}:00 – ${String(parseInt(sunrise)+4).padStart(2,"0")}:00`;
}

function getSpecies(temp, month) {
  const s = [];
  if (temp >= 10) { s.push("Carp"); s.push("Tench"); }
  if (temp >= 8) { s.push("Bream"); s.push("Roach"); }
  if (temp >= 6) { s.push("Perch"); s.push("Pike"); }
  if (temp >= 14) s.push("Rudd");
  if (month >= 6 && month <= 9 && temp >= 16) s.push("Barbel");
  return s.slice(0, 4);
}

function getBait(temp, rain) {
  if (temp >= 15) return "Boilies, Sweetcorn, Surface baits";
  if (temp >= 12) return "Pellets, Corn, Worms, Method feeder";
  if (temp >= 8) return "Maggots, Casters, Small feeder rigs";
  return "Single maggot, Pinkies — fish slow and light";
}

function getMoonPhase(date) {
  const phases = ["New Moon","Waxing Crescent","First Quarter","Waxing Gibbous","Full Moon","Waning Gibbous","Last Quarter","Waning Crescent"];
  const known = new Date("2000-01-06");
  const cycle = 29.53;
  const diff = (date - known) / (1000 * 60 * 60 * 24);
  const phase = ((diff % cycle) + cycle) % cycle;
  return phases[Math.floor((phase / cycle) * 8)];
}

function getPressureTrend(pressures, idx) {
  if (idx === 0) return "Stable";
  const diff = pressures[idx] - pressures[idx - 1];
  if (diff > 1.5) return "Rising";
  if (diff < -1.5) return "Falling";
  return "Stable";
}

// ── FORECAST TAB ─────────────────────────────────────────────────────────────
function ForecastTab() {
  const [postcode, setPostcode] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [location, setLocation] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | loading | error | done

  const lookup = async () => {
    const clean = inputVal.trim().toUpperCase().replace(/\s+/g, "");
    if (!clean) return;
    setStatus("loading");
    setForecast(null);
    try {
      // Step 1: postcode → lat/lng
      const pcRes = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
      const pcData = await pcRes.json();
      if (pcData.status !== 200) throw new Error("Postcode not found");
      const { latitude: lat, longitude: lng, admin_county, admin_district, region } = pcData.result;
      const placeName = admin_county || admin_district || region || clean;
      setLocation({ lat, lng, name: placeName, postcode: clean });

      // Step 2: weather from Open-Meteo (free, no key)
      const wxUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,surface_pressure_max,cloudcover_mean,sunrise,sunset&timezone=Europe%2FLondon&forecast_days=7`;
      const wxRes = await fetch(wxUrl);
      const wx = await wxRes.json();
      const d = wx.daily;

      // Step 3: build fishing forecast array
      const days = d.time.map((dateStr, i) => {
        const date = new Date(dateStr);
        const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayNames[date.getDay()];
        const avgTemp = Math.round((d.temperature_2m_max[i] + d.temperature_2m_min[i]) / 2);
        const windspeed = Math.round(d.windspeed_10m_max[i]);
        const rain = Math.round(d.precipitation_sum[i] * 10) / 10;
        const pressure = Math.round(d.surface_pressure_max[i]);
        const cloud = Math.round(d.cloudcover_mean[i]);
        const trend = getPressureTrend(d.surface_pressure_max, i);
        const sunrise = d.sunrise[i].split("T")[1].slice(0,5);
        const sunset = d.sunset[i].split("T")[1].slice(0,5);
        const moon = getMoonPhase(date);
        const month = date.getMonth() + 1;
        const score = calcFishingScore({ temp: avgTemp, windspeed, rain, pressureTrend: trend, cloud });
        const rating = getRating(score);
        return { dateStr, dayName, displayDate: date.toLocaleDateString("en-GB",{day:"numeric",month:"short"}), temp: avgTemp, tempMax: Math.round(d.temperature_2m_max[i]), tempMin: Math.round(d.temperature_2m_min[i]), windspeed, rain, pressure, pressureTrend: trend, cloud, sunrise, sunset, moon, score, rating, bestTime: getBestWindows(score, sunrise, sunset), species: getSpecies(avgTemp, month), bait: getBait(avgTemp, rain) };
      });

      setForecast(days);
      setSelected(0);
      setPostcode(clean);
      setStatus("done");
    } catch (e) {
      setStatus("error");
    }
  };

  const day = forecast?.[selected];
  const windDir = ["N","NE","E","SE","S","SW","W","NW"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Postcode search */}
      <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 20 }}>
        <div style={{ fontSize: 11, color: theme.accent, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>📍 YOUR LOCATION</div>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={inputVal} onChange={e => setInputVal(e.target.value)} onKeyDown={e => e.key === "Enter" && lookup()} placeholder="Enter your postcode — e.g. OX7 1AA" style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 16px", color: theme.text, fontSize: 14, fontFamily: "inherit", outline: "none", letterSpacing: 1 }} />
          <button onClick={lookup} disabled={status === "loading"} style={{ background: status === "loading" ? theme.border : theme.accent, color: status === "loading" ? theme.textMuted : "#000", border: "none", borderRadius: 12, padding: "12px 24px", cursor: status === "loading" ? "not-allowed" : "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>
            {status === "loading" ? "⏳ Loading..." : "Get Forecast →"}
          </button>
        </div>
        {status === "error" && <div style={{ color: theme.danger, fontSize: 13, marginTop: 10 }}>⚠️ Postcode not found. Try a full UK postcode like OX7 1AA or NG1 1AA.</div>}
        {location && status === "done" && <div style={{ color: theme.textMuted, fontSize: 13, marginTop: 10 }}>📍 Showing 7-day fishing forecast for <strong style={{ color: theme.accent }}>{location.name}</strong> ({location.postcode})</div>}
      </div>

      {/* No forecast yet */}
      {status === "idle" && (
        <div style={{ background: theme.surfaceAlt, border: `2px dashed ${theme.border}`, borderRadius: 16, padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎣</div>
          <div style={{ fontWeight: 700, color: theme.text, fontSize: 18, fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>Your Personal Fishing Forecast</div>
          <div style={{ color: theme.textMuted, fontSize: 14, maxWidth: 400, margin: "0 auto" }}>Enter your postcode above to get a real 7-day fishing forecast based on actual weather conditions at your location — including fishing score, best time windows, target species, and bait recommendations.</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
            {["OX7 1AA","B1 1AA","LS1 1BA","M1 1AE","SW1A 1AA"].map(pc => (
              <button key={pc} onClick={() => { setInputVal(pc); }} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 20, padding: "6px 14px", color: theme.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>{pc}</button>
            ))}
          </div>
        </div>
      )}

      {/* Forecast loaded */}
      {status === "done" && forecast && day && (
        <>
          {/* 7-day strip */}
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
            {forecast.map((d, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ background: i === selected ? theme.accent : theme.surfaceAlt, color: i === selected ? "#000" : theme.textMuted, border: `1px solid ${i === selected ? theme.accent : theme.border}`, borderRadius: 12, padding: "10px 14px", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", minWidth: 80, textAlign: "center", transition: "all 0.2s", flexShrink: 0 }}>
                <div style={{ fontSize: 11 }}>{d.dayName.slice(0,3)}</div>
                <div style={{ fontSize: 9, opacity: 0.7, marginBottom: 4 }}>{d.displayDate}</div>
                <div style={{ fontSize: 20 }}>{d.rating === "Excellent" ? "🟢" : d.rating === "Good" ? "🟡" : d.rating === "Fair" ? "🟠" : "🔴"}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: i === selected ? "#000" : ratingColor(d.rating), marginTop: 2 }}>{d.score}</div>
                <div style={{ fontSize: 10, marginTop: 2, opacity: 0.8 }}>{d.tempMax}°/{d.tempMin}°</div>
              </button>
            ))}
          </div>

          {/* Main day card */}
          <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 26, fontWeight: 800, color: theme.text, fontFamily: "'Playfair Display', serif" }}>{day.dayName}</div>
                <div style={{ color: theme.textMuted, fontSize: 14 }}>{day.displayDate} · {location?.name}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: ratingColor(day.rating) }}>{day.score}</div>
                <Badge text={day.rating} color={ratingColor(day.rating)} />
              </div>
            </div>

            <ScoreBar score={day.score} />

            {/* Score explanation */}
            <div style={{ marginTop: 16, background: theme.surface, borderRadius: 12, padding: 14, borderLeft: `3px solid ${ratingColor(day.rating)}`, marginBottom: 4 }}>
              <div style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.6 }}>
                {day.score >= 8 && "🟢 Conditions are excellent for coarse fishing. Stable/rising pressure, comfortable temps, and light winds create ideal feeding conditions."}
                {day.score >= 6.5 && day.score < 8 && "🟡 Good fishing conditions. Some factors are less than ideal but fish should be active during the best windows."}
                {day.score >= 4.5 && day.score < 6.5 && "🟠 Fair conditions — manageable but challenging. Target the best time windows carefully and adjust tactics accordingly."}
                {day.score < 4.5 && "🔴 Tough conditions. High winds, heavy rain, or falling pressure will suppress fish activity. Consider another day if possible."}
              </div>
            </div>

            {/* Weather grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
              {[
                { label: "Air Temp", value: `${day.temp}°C (${day.tempMin}–${day.tempMax}°)`, icon: "🌡️" },
                { label: "Wind Speed", value: `${day.windspeed} km/h`, icon: "💨" },
                { label: "Rainfall", value: day.rain === 0 ? "None" : `${day.rain}mm`, icon: "🌧️" },
                { label: "Pressure", value: `${day.pressure} hPa`, icon: "📊" },
                { label: "Pressure Trend", value: day.pressureTrend, icon: day.pressureTrend === "Rising" ? "📈" : day.pressureTrend === "Falling" ? "📉" : "➡️" },
                { label: "Cloud Cover", value: `${day.cloud}%`, icon: "☁️" },
                { label: "Sunrise", value: day.sunrise, icon: "🌅" },
                { label: "Sunset", value: day.sunset, icon: "🌇" },
                { label: "Moon Phase", value: day.moon, icon: "🌙" },
              ].map((item, i) => (
                <div key={i} style={{ background: theme.surface, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, color: theme.textMuted, marginBottom: 4 }}>{item.icon} {item.label}</div>
                  <div style={{ color: item.label === "Pressure Trend" ? (day.pressureTrend === "Rising" ? theme.accent : day.pressureTrend === "Falling" ? theme.danger : theme.warning) : theme.text, fontWeight: 600, fontSize: 13 }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Best windows */}
            <div style={{ marginTop: 16, background: theme.surface, borderRadius: 12, padding: 16, borderLeft: `3px solid ${theme.accent}` }}>
              <div style={{ fontSize: 11, color: theme.accent, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>⏰ BEST FISHING WINDOWS</div>
              <div style={{ color: theme.text, fontSize: 14, fontWeight: 600 }}>{day.bestTime}</div>
            </div>

            {/* Species */}
            {day.species.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>🐟 LIKELY ACTIVE SPECIES</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {day.species.map((s, i) => <Badge key={i} text={s} color={theme.water} />)}
                </div>
              </div>
            )}

            {/* Bait */}
            <div style={{ marginTop: 16, background: theme.surface, borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>🎣 RECOMMENDED BAIT FOR CONDITIONS</div>
              <div style={{ color: theme.text, fontSize: 14 }}>{day.bait}</div>
            </div>
          </div>

          {/* Weekly overview bar */}
          <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>📅 7-DAY OVERVIEW — {location?.name?.toUpperCase()}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {forecast.map((d, i) => (
                <div key={i} onClick={() => setSelected(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: i === selected ? ratingColor(d.rating) + "11" : "transparent", border: `1px solid ${i === selected ? ratingColor(d.rating) + "44" : "transparent"}`, borderRadius: 10, cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ width: 80, fontSize: 12, fontWeight: 600, color: i === selected ? theme.text : theme.textMuted }}>{d.dayName.slice(0,3)} {d.displayDate}</div>
                  <div style={{ flex: 1, background: theme.border, borderRadius: 4, height: 6 }}>
                    <div style={{ width: `${d.score * 10}%`, height: "100%", background: ratingColor(d.rating), borderRadius: 4, transition: "width 0.4s" }} />
                  </div>
                  <div style={{ width: 30, fontSize: 13, fontWeight: 800, color: ratingColor(d.rating), textAlign: "right" }}>{d.score}</div>
                  <div style={{ width: 55, fontSize: 11 }}>{d.tempMax}°C {d.rain > 0 ? "🌧️" : "☀️"}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ReportTab() {
  const sections = [
    { icon: "🌡️", title: "May Conditions Overview", content: "Water temperatures across UK stillwaters are rising steadily through 10–14°C — the sweet spot for carp and tench activity. Expect aggressive feeding spells at dawn and dusk as fish move into shallower, warmer margins. Barometric pressure has been generally stable this month, favouring consistent sport across most species." },
    { icon: "🐟", title: "Species in Focus: Tench", content: "May is arguably the finest month for tench fishing in the UK. Fish are pre-spawn, feeding heavily to build condition. Target lily pad margins and weed bed edges with sweetcorn, worms, and method feeder rigs loaded with groundbait. First and last light produces most takes. Specimens of 6lb+ are realistic on well-stocked venues this month." },
    { icon: "🎣", title: "Technique of the Month: Margin Fishing", content: "As water warms, fish migrate to the margins far more predictably. A simple float rig with a size 12 hook, 6lb line, and a piece of sweetcorn or a worm dropped tight against marginal reeds will outperform open water methods by a significant margin through May and June. Plumb the depth carefully — fish will often be sitting in just 18 inches of water." },
    { icon: "📋", title: "Regulation Reminder", content: "The river close season runs 15 March to 15 June on most English rivers — check EA guidance for your specific watercourse. Stillwaters and canals remain open year-round. Ensure your EA rod licence is valid before every session. A one-rod licence costs £33/year for adults. Two-rod licences cost £47. Junior licences (under 17) are free." },
    { icon: "🌿", title: "Coming in June", content: "Crucian carp reach peak activity in June — often overlooked but one of the most rewarding species to target on light float tackle. We'll be profiling the best crucian venues in our June report. Barbel sport on rivers begins to improve post-June 16 opening day — preparation advice and terminal tackle breakdown featured next month." },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.accentDim}33, ${theme.waterDim}33)`, border: `1px solid ${theme.accent}44`, borderRadius: 16, padding: 24 }}>
        <div style={{ fontSize: 11, color: theme.accent, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>MONTHLY REPORT</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: theme.text, fontFamily: "'Playfair Display', serif" }}>{new Date().toLocaleString('en-GB', { month: 'long', year: 'numeric' })}</div>
        <div style={{ color: theme.textMuted, marginTop: 6, fontSize: 14 }}>Your comprehensive monthly guide to fishing conditions, species, techniques and regulations across the UK.</div>
      </div>
      {sections.map((s, i) => (
        <div key={i} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 18, marginBottom: 10 }}>{s.icon} <span style={{ fontWeight: 700, color: theme.text, fontFamily: "'Playfair Display', serif", fontSize: 17 }}>{s.title}</span></div>
          <div style={{ color: theme.textMuted, fontSize: 14, lineHeight: 1.8 }}>{s.content}</div>
        </div>
      ))}
    </div>
  );
}

const categoryConfig = {
  "All": { color: theme.text, icon: "💬" },
  "General Chat": { color: theme.accent, icon: "🗣️" },
  "Catch Reports": { color: theme.good, icon: "🐟" },
  "Tackle Talk": { color: theme.water, icon: "🎣" },
  "Ask a Question": { color: theme.warning, icon: "❓" },
  "Venue Tips": { color: "#a78bfa", icon: "📍" },
  "Beginners": { color: "#fb923c", icon: "🌱" },
};

const initialPosts = [];

function CommunityTab() {
  const [posts, setPosts] = useState(initialPosts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedPost, setExpandedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "", category: "General Chat" });
  const [replyText, setReplyText] = useState({});
  const [showReplyBox, setShowReplyBox] = useState(null);

  const filtered = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory);

  const toggleLike = (id) => {
    setLikedPosts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: likedPosts.includes(id) ? p.likes - 1 : p.likes + 1 } : p));
  };

  const submitPost = () => {
    if (!newPost.title.trim() || !newPost.body.trim()) return;
    const post = { id: Date.now(), user: "You", avatar: "😊", time: "Just now", category: newPost.category, title: newPost.title, body: newPost.body, likes: 0, replies: [] };
    setPosts(prev => [post, ...prev]);
    setNewPost({ title: "", body: "", category: "General Chat" });
    setShowNewPost(false);
  };

  const submitReply = (postId) => {
    const text = replyText[postId];
    if (!text?.trim()) return;
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, replies: [...p.replies, { user: "You", avatar: "😊", time: "Just now", text }] } : p));
    setReplyText(prev => ({ ...prev, [postId]: "" }));
    setShowReplyBox(null);
    setExpandedPost(postId);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Header bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, fontFamily: "'Playfair Display', serif" }}>Community</div>
          <div style={{ fontSize: 13, color: theme.textMuted }}>{posts.length} discussions · {posts.reduce((a, p) => a + p.replies.length, 0)} replies</div>
        </div>
        <button onClick={() => setShowNewPost(!showNewPost)} style={{ background: theme.accent, color: "#000", border: "none", borderRadius: 12, padding: "10px 20px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
          ✏️ New Post
        </button>
      </div>

      {/* New post form */}
      {showNewPost && (
        <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.accent}44`, borderRadius: 16, padding: 20, animation: "fadeIn 0.2s ease" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 14 }}>Start a Discussion</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            {Object.entries(categoryConfig).filter(([k]) => k !== "All").map(([cat, cfg]) => (
              <button key={cat} onClick={() => setNewPost(p => ({ ...p, category: cat }))} style={{ background: newPost.category === cat ? cfg.color + "33" : theme.surface, color: newPost.category === cat ? cfg.color : theme.textMuted, border: `1px solid ${newPost.category === cat ? cfg.color : theme.border}`, borderRadius: 20, padding: "5px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600 }}>
                {cfg.icon} {cat}
              </button>
            ))}
          </div>
          <input value={newPost.title} onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))} placeholder="Title — what's your post about?" style={{ width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 14px", color: theme.text, fontSize: 14, fontFamily: "inherit", outline: "none", marginBottom: 10 }} />
          <textarea value={newPost.body} onChange={e => setNewPost(p => ({ ...p, body: e.target.value }))} placeholder="Share your catch, ask a question, give venue advice..." rows={4} style={{ width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 14px", color: theme.text, fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", marginBottom: 12 }} />
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setShowNewPost(false)} style={{ flex: 1, background: "none", border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px", color: theme.textMuted, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
            <button onClick={submitPost} disabled={!newPost.title.trim() || !newPost.body.trim()} style={{ flex: 2, background: !newPost.title.trim() || !newPost.body.trim() ? theme.border : theme.accent, color: !newPost.title.trim() || !newPost.body.trim() ? theme.textMuted : "#000", border: "none", borderRadius: 10, padding: "10px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Post →</button>
          </div>
        </div>
      )}

      {/* Category filters */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
        {Object.entries(categoryConfig).map(([cat, cfg]) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ background: activeCategory === cat ? cfg.color + "22" : theme.surfaceAlt, color: activeCategory === cat ? cfg.color : theme.textMuted, border: `1px solid ${activeCategory === cat ? cfg.color : theme.border}`, borderRadius: 20, padding: "6px 14px", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", transition: "all 0.2s" }}>
            {cfg.icon} {cat}
          </button>
        ))}
      </div>

      {/* Posts */}
      {filtered.length === 0 && (
        <div style={{ background: theme.surfaceAlt, border: `2px dashed ${theme.border}`, borderRadius: 16, padding: 40, textAlign: "center", marginTop: 8 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>
          <div style={{ fontWeight: 700, color: theme.text, fontSize: 16, fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>No posts yet</div>
          <div style={{ color: theme.textMuted, fontSize: 14, marginBottom: 20 }}>Be the first to start a discussion. Share a catch report, ask a question, or give venue advice.</div>
          <button onClick={() => setShowNewPost(true)} style={{ background: theme.accent, color: "#000", border: "none", borderRadius: 10, padding: "10px 24px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13 }}>Start the conversation</button>
        </div>
      )}

      {filtered.map(post => {
        const catCfg = categoryConfig[post.category] || categoryConfig["General Chat"];
        const isExpanded = expandedPost === post.id;
        const isLiked = likedPosts.includes(post.id);

        return (
          <div key={post.id} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 16, overflow: "hidden", transition: "all 0.2s" }}>

            {/* Post header */}
            <div style={{ padding: "18px 20px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: catCfg.color + "22", border: `1px solid ${catCfg.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{post.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: theme.text, fontSize: 14 }}>{post.user}</div>
                    <div style={{ fontSize: 11, color: theme.textMuted }}>{post.time}</div>
                  </div>
                </div>
                <Badge text={`${catCfg.icon} ${post.category}`} color={catCfg.color} />
              </div>

              <div style={{ fontWeight: 700, color: theme.text, fontSize: 16, marginBottom: 8, fontFamily: "'Playfair Display', serif", lineHeight: 1.4 }}>{post.title}</div>
              <div style={{ color: theme.textMuted, fontSize: 14, lineHeight: 1.7 }}>{post.body}</div>
            </div>

            {/* Action bar */}
            <div style={{ padding: "10px 20px 14px", display: "flex", alignItems: "center", gap: 0, borderTop: `1px solid ${theme.border}` }}>
              <button onClick={() => toggleLike(post.id)} style={{ background: "none", border: "none", color: isLiked ? theme.accent : theme.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, padding: "6px 14px 6px 0", display: "flex", alignItems: "center", gap: 6 }}>
                {isLiked ? "❤️" : "🤍"} {post.likes}
              </button>
              <button onClick={() => setExpandedPost(isExpanded ? null : post.id)} style={{ background: "none", border: "none", color: theme.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6 }}>
                💬 {post.replies.length} {post.replies.length === 1 ? "reply" : "replies"}
              </button>
              <button onClick={() => { setShowReplyBox(showReplyBox === post.id ? null : post.id); setExpandedPost(post.id); }} style={{ background: "none", border: "none", color: theme.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, padding: "6px 14px", marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                ↩️ Reply
              </button>
            </div>

            {/* Replies */}
            {isExpanded && post.replies.length > 0 && (
              <div style={{ borderTop: `1px solid ${theme.border}`, background: theme.surface }}>
                {post.replies.map((r, i) => (
                  <div key={i} style={{ padding: "14px 20px", borderBottom: i < post.replies.length - 1 ? `1px solid ${theme.border}` : "none", display: "flex", gap: 12 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: theme.accent + "22", border: `1px solid ${theme.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{r.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, color: theme.text, fontSize: 13 }}>{r.user}</span>
                        <span style={{ fontSize: 11, color: theme.textMuted }}>{r.time}</span>
                      </div>
                      <div style={{ color: theme.textMuted, fontSize: 14, lineHeight: 1.6 }}>{r.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reply box */}
            {showReplyBox === post.id && (
              <div style={{ borderTop: `1px solid ${theme.border}`, padding: "14px 20px", background: theme.surface, display: "flex", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: theme.accent + "33", border: `1px solid ${theme.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>😊</div>
                <div style={{ flex: 1, display: "flex", gap: 8 }}>
                  <input value={replyText[post.id] || ""} onChange={e => setReplyText(prev => ({ ...prev, [post.id]: e.target.value }))} onKeyDown={e => e.key === "Enter" && submitReply(post.id)} placeholder="Write a reply..." style={{ flex: 1, background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "8px 14px", color: theme.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
                  <button onClick={() => submitReply(post.id)} disabled={!replyText[post.id]?.trim()} style={{ background: !replyText[post.id]?.trim() ? theme.border : theme.accent, color: !replyText[post.id]?.trim() ? theme.textMuted : "#000", border: "none", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13 }}>Post</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const forumCategories = [
  { id: "carp",      name: "Carp Fishing",        desc: "Tactics, bait, rigs, venues and specimen hunting",             icon: "🐟", color: "#e67e22", threads: 0, posts: 0, latest: null },
  { id: "match",     name: "Match & Commercial",   desc: "Match fishing, F1s, commercials, leagues and results",         icon: "🏆", color: "#2dd87a", threads: 0, posts: 0, latest: null },
  { id: "pike",      name: "Pike & Predator",      desc: "Pike, perch, zander — lures, deadbaiting, specimen work",      icon: "🦷", color: "#e74c3c", threads: 0, posts: 0, latest: null },
  { id: "coarse",    name: "General Coarse",       desc: "Roach, bream, tench, chub, barbel and everything in between",  icon: "🎣", color: "#1a9cc7", threads: 0, posts: 0, latest: null },
  { id: "sea",       name: "Sea Fishing",          desc: "Shore, boat, estuary — bass, cod, mackerel and more",          icon: "🌊", color: "#0e6a8a", threads: 0, posts: 0, latest: null },
  { id: "fly",       name: "Fly Fishing",          desc: "Trout, grayling, salmon — fly tying, technique and venues",    icon: "🪁", color: "#a78bfa", threads: 0, posts: 0, latest: null },
  { id: "tackle",    name: "Tackle & Equipment",   desc: "Rods, reels, lines, bivvies — reviews and recommendations",    icon: "🔧", color: "#d4a72c", threads: 0, posts: 0, latest: null },
  { id: "beginners", name: "Beginners Corner",     desc: "New to fishing? Ask anything — no question too basic",         icon: "🌱", color: "#7ac943", threads: 0, posts: 0, latest: null },
  { id: "venues",    name: "Venue Reviews",        desc: "Tell us about where you fish — honest member reviews",         icon: "📍", color: "#fb923c", threads: 0, posts: 0, latest: null },
  { id: "rules",     name: "Rules & Regulations",  desc: "EA licences, close seasons, bylaws and your rights",           icon: "📋", color: "#7a9a82", threads: 0, posts: 0, latest: null },
];

const threadData = {
  carp: [], match: [], pike: [], coarse: [], sea: [], fly: [], tackle: [], beginners: [], venues: [], rules: [],
};

function ForumTab() {
  const [view, setView] = useState("categories"); // categories | threads | thread
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeThread, setActiveThread] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [threads, setThreads] = useState(threadData);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newThread, setNewThread] = useState({ title: "", body: "" });

  const cat = forumCategories.find(c => c.id === activeCategory);
  const catThreads = threads[activeCategory] || [];
  const thread = catThreads.find(t => t.id === activeThread);

  const postReply = () => {
    if (!replyText.trim()) return;
    setThreads(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map(t =>
        t.id === activeThread
          ? { ...t, replies: t.replies + 1, posts: [...t.posts, { user: "You", time: "Just now", body: replyText }] }
          : t
      )
    }));
    setReplyText("");
  };

  const submitThread = () => {
    if (!newThread.title.trim() || !newThread.body.trim()) return;
    const t = { id: Date.now(), title: newThread.title, user: "You", time: "Just now", replies: 0, views: 1, pinned: false, body: newThread.body, posts: [] };
    setThreads(prev => ({ ...prev, [activeCategory]: [t, ...(prev[activeCategory] || [])] }));
    setNewThread({ title: "", body: "" });
    setShowNewThread(false);
  };

  // Category list view
  if (view === "categories") return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, fontFamily: "'Playfair Display', serif" }}>Fishing Forum</div>
          <div style={{ fontSize: 13, color: theme.textMuted }}>{forumCategories.reduce((a, c) => a + c.threads, 0)} threads · {forumCategories.reduce((a, c) => a + c.posts, 0)} posts — be the first to post</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {forumCategories.map(cat => (
          <div key={cat.id} onClick={() => { setActiveCategory(cat.id); setView("threads"); }} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "16px 20px", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: cat.color + "22", border: `1px solid ${cat.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{cat.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, color: theme.text, fontSize: 15, marginBottom: 2 }}>{cat.name}</div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 6 }}>{cat.desc}</div>
              <div style={{ fontSize: 11, color: theme.textMuted }}>
                {cat.latest ? <><span style={{ color: cat.color, fontWeight: 600 }}>{cat.latest.user}</span> · {cat.latest.time} · <em style={{ color: theme.textMuted }}>{cat.latest.title.slice(0, 50)}{cat.latest.title.length > 50 ? "..." : ""}</em></> : <em>No posts yet — be the first</em>}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{cat.threads}</div>
              <div style={{ fontSize: 10, color: theme.textMuted }}>threads</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.textMuted }}>{cat.posts.toLocaleString()}</div>
              <div style={{ fontSize: 10, color: theme.textMuted }}>posts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Thread list view
  if (view === "threads" && cat) return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <button onClick={() => setView("categories")} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "6px 12px", color: theme.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>← Back</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: theme.text, fontFamily: "'Playfair Display', serif" }}>{cat.icon} {cat.name}</div>
          <div style={{ fontSize: 12, color: theme.textMuted }}>{cat.desc}</div>
        </div>
        <button onClick={() => setShowNewThread(!showNewThread)} style={{ background: theme.accent, color: "#000", border: "none", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13 }}>+ New Thread</button>
      </div>

      {showNewThread && (
        <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.accent}44`, borderRadius: 14, padding: 18, marginBottom: 16 }}>
          <input value={newThread.title} onChange={e => setNewThread(p => ({ ...p, title: e.target.value }))} placeholder="Thread title..." style={{ width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 14px", color: theme.text, fontSize: 14, fontFamily: "inherit", outline: "none", marginBottom: 10 }} />
          <textarea value={newThread.body} onChange={e => setNewThread(p => ({ ...p, body: e.target.value }))} placeholder="Start the discussion..." rows={4} style={{ width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 14px", color: theme.text, fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", marginBottom: 10 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setShowNewThread(false)} style={{ flex: 1, background: "none", border: `1px solid ${theme.border}`, borderRadius: 8, padding: "8px", color: theme.textMuted, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
            <button onClick={submitThread} style={{ flex: 2, background: theme.accent, color: "#000", border: "none", borderRadius: 8, padding: "8px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Post Thread</button>
          </div>
        </div>
      )}

      {catThreads.length === 0 && (
        <div style={{ background: theme.surfaceAlt, border: `2px dashed ${theme.border}`, borderRadius: 14, padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>{cat.icon}</div>
          <div style={{ color: theme.text, fontWeight: 700, marginBottom: 6 }}>No threads yet</div>
          <div style={{ color: theme.textMuted, fontSize: 13 }}>Be the first to start a discussion in {cat.name}</div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {catThreads.map(t => (
          <div key={t.id} onClick={() => { setActiveThread(t.id); setView("thread"); }} style={{ background: theme.surfaceAlt, border: `1px solid ${t.pinned ? cat.color + "66" : theme.border}`, borderRadius: 12, padding: "14px 18px", cursor: "pointer", transition: "all 0.2s", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                {t.pinned && <Badge text="Pinned" color={cat.color} />}
                <span style={{ fontWeight: 700, color: theme.text, fontSize: 14, lineHeight: 1.4 }}>{t.title}</span>
              </div>
              <div style={{ fontSize: 12, color: theme.textMuted }}><span style={{ color: cat.color, fontWeight: 600 }}>{t.user}</span> · {t.time}</div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.body}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{t.replies}</div>
              <div style={{ fontSize: 10, color: theme.textMuted }}>replies</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.textMuted, marginTop: 4 }}>{t.views}</div>
              <div style={{ fontSize: 10, color: theme.textMuted }}>views</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Thread detail / post view
  if (view === "thread" && thread && cat) return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <button onClick={() => setView("threads")} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "6px 12px", color: theme.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>← {cat.name}</button>
      </div>

      {/* Original post */}
      <div style={{ background: theme.surfaceAlt, border: `1px solid ${cat.color}44`, borderRadius: 16, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ background: cat.color + "11", borderBottom: `1px solid ${cat.color}33`, padding: "16px 20px" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: theme.text, fontFamily: "'Playfair Display', serif", lineHeight: 1.4, marginBottom: 8 }}>{thread.title}</div>
          <div style={{ display: "flex", gap: 12, fontSize: 12, color: theme.textMuted }}>
            <span style={{ color: cat.color, fontWeight: 700 }}>{thread.user}</span>
            <span>{thread.time}</span>
            <span>{thread.replies} replies</span>
            <span>{thread.views} views</span>
          </div>
        </div>
        <div style={{ padding: "16px 20px" }}>
          <p style={{ color: theme.text, fontSize: 14, lineHeight: 1.8, margin: 0 }}>{thread.body}</p>
        </div>
      </div>

      {/* Replies */}
      {thread.posts.map((p, i) => (
        <div key={i} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 14, marginBottom: 10, display: "flex", gap: 14, padding: "16px 20px" }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: cat.color + "22", border: `1px solid ${cat.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👤</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, color: cat.color, fontSize: 14 }}>{p.user}</span>
              <span style={{ fontSize: 11, color: theme.textMuted }}>{p.time}</span>
              <span style={{ fontSize: 11, color: theme.textMuted }}>#{i + 1}</span>
            </div>
            <p style={{ color: theme.text, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{p.body}</p>
          </div>
        </div>
      ))}

      {/* Reply box */}
      <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18, marginTop: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 10 }}>Post a Reply</div>
        <textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Write your reply..." rows={4} style={{ width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 14px", color: theme.text, fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", marginBottom: 10 }} />
        <button onClick={postReply} disabled={!replyText.trim()} style={{ background: !replyText.trim() ? theme.border : theme.accent, color: !replyText.trim() ? theme.textMuted : "#000", border: "none", borderRadius: 10, padding: "10px 24px", cursor: !replyText.trim() ? "not-allowed" : "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 14 }}>Post Reply</button>
      </div>
    </div>
  );

  return null;
}

function HomePage({ setTab }) {
  const [postcode, setPostcode] = useState("");
  const [forecast, setForecast] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [forecastLoading, setForecastLoading] = useState(false);

  const quickForecast = async () => {
    const clean = postcode.trim().toUpperCase().replace(/\s+/g, "");
    if (!clean) return;
    setForecastLoading(true);
    try {
      const pcRes = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
      const pcData = await pcRes.json();
      if (pcData.status !== 200) throw new Error();
      const { latitude: lat, longitude: lng, admin_county, admin_district } = pcData.result;
      setLocationName(admin_county || admin_district || clean);
      const wxRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,surface_pressure_max&timezone=Europe%2FLondon&forecast_days=3`);
      const wx = await wxRes.json();
      const days = wx.daily.time.map((d, i) => {
        const avgTemp = Math.round((wx.daily.temperature_2m_max[i] + wx.daily.temperature_2m_min[i]) / 2);
        const wind = Math.round(wx.daily.windspeed_10m_max[i]);
        const rain = Math.round(wx.daily.precipitation_sum[i] * 10) / 10;
        const pressure = wx.daily.surface_pressure_max[i];
        const trend = i === 0 ? "Stable" : pressure > wx.daily.surface_pressure_max[i-1] + 1.5 ? "Rising" : pressure < wx.daily.surface_pressure_max[i-1] - 1.5 ? "Falling" : "Stable";
        let score = 5;
        if (avgTemp >= 12 && avgTemp <= 17) score += 2; else if (avgTemp >= 9) score += 1; else score -= 1;
        if (wind < 10) score += 1.5; else if (wind < 20) score += 0.5; else score -= 1.5;
        if (rain === 0) score += 0.5; else if (rain < 3) score += 0.2; else if (rain < 8) score -= 1; else score -= 2.5;
        if (trend === "Rising") score += 1.2; else if (trend === "Falling") score -= 1;
        score = Math.min(10, Math.max(1, Math.round(score * 10) / 10));
        const rating = score >= 8 ? "Excellent" : score >= 6.5 ? "Good" : score >= 4.5 ? "Fair" : "Poor";
        const names = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const date = new Date(d);
        return { day: i === 0 ? "Today" : i === 1 ? "Tomorrow" : names[date.getDay()], score, rating, temp: avgTemp, rain };
      });
      setForecast(days);
    } catch {}
    setForecastLoading(false);
  };

  const features = [
    { id: "forecast", icon: "🌤️", title: "Live Fishing Forecast", body: "Real weather data for your exact location. Fishing score, best time windows, target species and bait recommendations — updated daily.", color: theme.water },
    { id: "directory", icon: "📍", title: "Venue Directory", body: "Day ticket fisheries across the UK with full details, reviews, rules and nearest campsites. Search by region, species or venue type.", color: theme.accent },
    { id: "planner", icon: "🗺️", title: "AI Trip Planner", body: "Pick a venue, choose your dates, set your nights. Our AI builds a complete trip plan — session timetable, bait setup, kit checklist and local tips.", color: "#a78bfa" },
    { id: "forum", icon: "💬", title: "Fishing Forum", body: "10 dedicated sub-forums covering every type of fishing. Ask questions, share catches, get venue tips from anglers who know.", color: "#fb923c" },
    { id: "chat", icon: "🤖", title: "AI Fishing Guide", body: "Ask anything — species identification, rig setup, bait choice, regulations, river reading. Expert answers in seconds.", color: theme.warning },
    { id: "report", icon: "📋", title: "Monthly Report", body: "Seasonal conditions, species in focus, technique of the month, regulation reminders. Everything you need to fish smarter.", color: theme.good },
  ];

  const ratingCol = (r) => r === "Excellent" ? theme.excellent : r === "Good" ? theme.good : r === "Fair" ? theme.fair : theme.poor;

  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(180deg, #0a1a0e 0%, ${theme.bg} 100%)`, borderBottom: `1px solid ${theme.border}`, padding: "60px 24px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Background grid decoration */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 20% 50%, ${theme.accent}08 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${theme.water}08 0%, transparent 40%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-block", background: theme.accent + "22", border: `1px solid ${theme.accent}44`, borderRadius: 20, padding: "4px 16px", fontSize: 12, color: theme.accent, fontWeight: 700, letterSpacing: 1, marginBottom: 20 }}>FREE FOR ALL UK ANGLERS</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: theme.text, lineHeight: 1.15, marginBottom: 20, maxWidth: 700, margin: "0 auto 20px" }}>
            The UK's most complete<br />
            <span style={{ color: theme.accent }}>fishing guide</span>
          </h1>
          <p style={{ color: theme.textMuted, fontSize: 16, maxWidth: 500, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Live forecasts, venue directory, trip planner, forum and AI fishing guide — all completely free.
          </p>

          {/* Postcode forecast widget */}
          <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 24, maxWidth: 520, margin: "0 auto", textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 12 }}>Check fishing conditions at your location</div>
            <div style={{ display: "flex", gap: 10 }}>
              <input
                value={postcode}
                onChange={e => setPostcode(e.target.value)}
                onKeyDown={e => e.key === "Enter" && quickForecast()}
                placeholder="Enter your postcode — e.g. OX7 1AA"
                style={{ flex: 1, background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "12px 16px", color: theme.text, fontSize: 14, fontFamily: "inherit", outline: "none" }}
              />
              <button onClick={quickForecast} disabled={forecastLoading}
                style={{ background: forecastLoading ? theme.border : theme.accent, color: forecastLoading ? theme.textMuted : "#000", border: "none", borderRadius: 10, padding: "12px 20px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>
                {forecastLoading ? "..." : "Check →"}
              </button>
            </div>

            {forecast && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>3-DAY FORECAST — {locationName.toUpperCase()}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {forecast.map((d, i) => (
                    <div key={i} style={{ background: theme.surfaceAlt, borderRadius: 12, padding: "12px 10px", textAlign: "center", border: `1px solid ${ratingCol(d.rating)}33` }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 6 }}>{d.day}</div>
                      <div style={{ fontSize: 26, fontWeight: 900, color: ratingCol(d.rating) }}>{d.score}</div>
                      <div style={{ fontSize: 11, color: ratingCol(d.rating), fontWeight: 700, marginTop: 2 }}>{d.rating}</div>
                      <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 4 }}>{d.temp}°C {d.rain > 0 ? "· 🌧️" : "· ☀️"}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setTab("forecast")} style={{ width: "100%", marginTop: 12, background: "none", border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px", color: theme.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}>
                  View full 7-day forecast →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: theme.text, fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>Everything you need. All free.</div>
          <div style={{ fontSize: 14, color: theme.textMuted }}>Six tools built for UK anglers — no subscription, no sign-up required.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {features.map((f, i) => (
            <div key={i} onClick={() => setTab(f.id)}
              style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 22, cursor: "pointer", transition: "all 0.2s", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: f.color + "22", border: `1px solid ${f.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: theme.text, fontSize: 15, marginBottom: 6 }}>{f.title}</div>
                <div style={{ color: theme.textMuted, fontSize: 13, lineHeight: 1.6 }}>{f.body}</div>
                <div style={{ color: f.color, fontSize: 12, fontWeight: 700, marginTop: 10 }}>Open →</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fishery owner CTA */}
      <div style={{ background: theme.surface, borderTop: `1px solid ${theme.border}`, padding: "40px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: theme.text, fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>Do you run a fishery?</div>
            <div style={{ color: theme.textMuted, fontSize: 14, maxWidth: 480, lineHeight: 1.6 }}>Get your venue listed in front of thousands of UK anglers — completely free. No credit card, no commitment.</div>
          </div>
          <button onClick={() => setTab("list")}
            style={{ background: theme.accent, color: "#000", border: "none", borderRadius: 12, padding: "14px 28px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 15, whiteSpace: "nowrap", flexShrink: 0 }}>
            List Your Fishery Free →
          </button>
        </div>
      </div>
    </div>
  );
}

function ListYourFisheryTab() {
  const [formData, setFormData] = useState({ name: "", email: "", fishery: "", phone: "", region: "", message: "" });
  const [status, setStatus] = useState("idle");
  const set = (f, v) => setFormData(prev => ({ ...prev, [f]: v }));

  const submit = async () => {
    if (!formData.name || !formData.email || !formData.fishery) return;
    setStatus("loading");
    try {
      await fetch("https://hook.eu1.make.com/e4rif83s57n7gcapxymbc75vydg2oaa5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "fishery_listing_enquiry", ...formData, date: new Date().toISOString().split("T")[0] })
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inp = { background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "12px 16px", color: theme.text, fontSize: 14, fontFamily: "inherit", outline: "none", width: "100%" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${theme.accentDim}33, ${theme.waterDim}22)`, border: `1px solid ${theme.accent}44`, borderRadius: 20, padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: theme.accent, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>FOR FISHERY OWNERS</div>
        <div style={{ fontSize: 30, fontWeight: 900, color: theme.text, fontFamily: "'Playfair Display', serif", lineHeight: 1.2, marginBottom: 16 }}>Get your fishery in front of thousands of UK anglers — completely free</div>
        <div style={{ color: theme.textMuted, fontSize: 15, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>Reel Big Fish is a free platform built for UK anglers. We're building the most complete fishing venue directory in the country and we want your fishery in it from day one.</div>
      </div>

      {/* What you get */}
      <div>
        <div style={{ fontSize: 20, fontWeight: 800, color: theme.text, fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>What's included — free</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { icon: "📍", title: "Full venue profile", body: "Name, location, description, photos, species, facilities and rules." },
            { icon: "🎟️", title: "Ticket pricing", body: "Day tickets, evening tickets, season tickets and night fishing availability." },
            { icon: "⛺", title: "Campsite information", body: "Nearest campsites, distances and facilities for overnight anglers." },
            { icon: "⭐", title: "Member reviews", body: "Genuine reviews from anglers who've fished your venue." },
            { icon: "🔍", title: "Search visibility", body: "Listed by region, species and venue type so anglers find you easily." },
            { icon: "📱", title: "Mobile optimised", body: "Your listing looks great on every device, every screen size." },
          ].map((item, i) => (
            <div key={i} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: theme.text, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: theme.textMuted, fontSize: 13, lineHeight: 1.6 }}>{item.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 28 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: theme.text, fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>Get Listed</div>
        <div style={{ fontSize: 14, color: theme.textMuted, marginBottom: 24 }}>Fill in your details and we'll get your fishery set up within 48 hours.</div>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✓</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: theme.accent, fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>You're on the list</div>
            <div style={{ color: theme.textMuted, fontSize: 14, lineHeight: 1.7 }}>We'll be in touch within 48 hours to get your fishery set up. Thank you for being part of Reel Big Fish.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>YOUR NAME *</div>
                <input value={formData.name} onChange={e => set("name", e.target.value)} placeholder="John Smith" style={inp} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>EMAIL ADDRESS *</div>
                <input value={formData.email} onChange={e => set("email", e.target.value)} placeholder="john@yourfishery.co.uk" style={inp} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>FISHERY NAME *</div>
                <input value={formData.fishery} onChange={e => set("fishery", e.target.value)} placeholder="e.g. Riverside Fishery" style={inp} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>PHONE NUMBER</div>
                <input value={formData.phone} onChange={e => set("phone", e.target.value)} placeholder="Optional" style={inp} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>REGION</div>
              <select value={formData.region} onChange={e => set("region", e.target.value)} style={{ ...inp }}>
                <option value="">Select your region...</option>
                {["East Midlands","East of England","London","North East","North West","South East","South West","West Midlands","Yorkshire","Wales","Scotland","Northern Ireland"].map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>ANYTHING ELSE?</div>
              <textarea value={formData.message} onChange={e => set("message", e.target.value)} placeholder="Tell us about your fishery, what makes it special, or any questions you have..." rows={4} style={{ ...inp, resize: "vertical" }} />
            </div>
            <button onClick={submit} disabled={!formData.name || !formData.email || !formData.fishery || status === "loading"}
              style={{ background: !formData.name || !formData.email || !formData.fishery ? theme.border : theme.accent, color: !formData.name || !formData.email || !formData.fishery ? theme.textMuted : "#000", border: "none", borderRadius: 12, padding: "16px", cursor: !formData.name || !formData.email || !formData.fishery ? "not-allowed" : "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 15, transition: "all 0.2s" }}>
              {status === "loading" ? "Sending..." : "Get Listed Free →"}
            </button>
            {status === "error" && <div style={{ color: theme.danger, fontSize: 13, textAlign: "center" }}>Something went wrong. Please try again.</div>}
          </div>
        )}
      </div>

      {/* Simple reassurances */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {[
          { title: "100% free", body: "No credit card, no hidden costs, no commitment required." },
          { title: "We do the work", body: "Send us your details and we'll build the listing for you." },
          { title: "Real anglers", body: "Our audience is actively searching for venues like yours." },
        ].map((item, i) => (
          <div key={i} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18, textAlign: "center" }}>
            <div style={{ fontWeight: 700, color: theme.accent, fontSize: 14, marginBottom: 6 }}>{item.title}</div>
            <div style={{ color: theme.textMuted, fontSize: 13, lineHeight: 1.6 }}>{item.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReelBigFishApp() {
  const [tab, setTab] = useState("home");
  const tabs = [
    { id: "home",      label: "Home" },
    { id: "forecast",  label: "Forecast" },
    { id: "directory", label: "Venues" },
    { id: "planner",   label: "Trip Planner" },
    { id: "forum",     label: "Forum" },
    { id: "community", label: "Community" },
    { id: "chat",      label: "AI Guide" },
    { id: "report",    label: "Report" },
    { id: "list",      label: "List Your Fishery" },
  ];
  return (
    <div style={{ minHeight: "100vh", background: theme.bg, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: theme.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: ${theme.surface}; }
        ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 4px; }
        @keyframes pulse { 0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{transform:translateY(100%)}to{transform:translateY(0)} }
        @keyframes shimmer { 0%,100%{opacity:0.6} 50%{opacity:1} }
        button:hover { filter: brightness(1.1); }
      `}</style>

      {/* Header */}
      <div style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}`, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div onClick={() => setTab("home")} style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${theme.accent}, ${theme.water})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 14, color: "#000", letterSpacing: -0.5 }}>RBF</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: theme.text, letterSpacing: -0.5 }}>Reel Big Fish</div>
            <div style={{ fontSize: 11, color: theme.textMuted, marginTop: -2 }}>The UK's Free Fishing Guide</div>
          </div>
        </div>
        <button onClick={() => setTab("list")} style={{ background: theme.accent, color: "#000", border: "none", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>
          List Your Fishery
        </button>
      </div>

      {/* Nav */}
      <div style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}`, padding: "0 24px", display: "flex", gap: 4, overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ background: "none", border: "none", borderBottom: `2px solid ${tab === t.id ? theme.accent : "transparent"}`, color: t.id === "list" ? theme.warning : tab === t.id ? theme.accent : theme.textMuted, padding: "14px 16px", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, transition: "all 0.2s", whiteSpace: "nowrap" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: tab === "home" ? "100%" : 900, margin: "0 auto", padding: tab === "home" ? 0 : 24 }}>
        {tab === "home"      && <HomePage setTab={setTab} />}
        {tab === "forecast"  && <ForecastTab />}
        {tab === "directory" && <DirectoryTab />}
        {tab === "planner"   && <TripPlannerTab />}
        {tab === "forum"     && <ForumTab />}
        {tab === "community" && <CommunityTab />}
        {tab === "chat"      && <ChatTab />}
        {tab === "report"    && <ReportTab />}
        {tab === "list"      && <ListYourFisheryTab />}
      </div>
    </div>
  );
}
