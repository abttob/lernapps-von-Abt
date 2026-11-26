/* Pflanzen-Datenbank für den Pflanzen-Coach (L35)
   Format: botanisch | deutsch (Synonyme mit ;) | Typ | Licht | Boden | Merkmale | Verwendungsgruppen | Blüte (Monate)
   Typ: B Baum, S Strauch, Z Zwerg-/Halbstrauch, T Staude, G Gras, F Farn, K Kletterpflanze, O Zwiebel/Knolle, E Wechselflor, U Kübelpflanze, W Schwimmblatt/Unterwasser
   Licht: S Sonne, H Halbschatten, X Schatten · Boden: T trocken, F frisch, N feucht/nass, W im Wasser/Sumpfzone
   Merkmale: i immergrün, e einheimisch, g stark giftig, q leicht giftig, b Bienen/Insekten, d Dornen/Stacheln, n essbar,
   x invasiver Neophyt, s Selbstklimmer, w Schlinger, r Ranker/Spreizklimmer, h schnittverträglich, v Vogelnährgehölz, f Herbstfärbung, k mager/kalk, c bodendeckend */
window.PDB_RAW=`
Acer campestre|Feld-Ahorn;Feldahorn|B|SH|TF|ehbfv|4,2,1|5
Acer platanoides|Spitz-Ahorn;Spitzahorn|B|SH|F|efb|2|4
Acer pseudoplatanus|Berg-Ahorn;Bergahorn|B|SH|F|ef|2|5
Acer palmatum|Fächer-Ahorn;Fächerahorn;Japanischer Ahorn|S|H|F|f|3,17|5
Betula pendula|Hänge-Birke;Hängebirke;Birke|B|S|TF|ef|2|4
Carpinus betulus|Hainbuche;Weissbuche|B|SHX|F|eh|1,4,2|5
Fagus sylvatica|Rot-Buche;Rotbuche;Buche|B|SHX|F|ehf|1,2|5
Tilia cordata|Winter-Linde;Winterlinde;Linde|B|SH|F|eb|2|6-7
Quercus robur|Stiel-Eiche;Stieleiche;Eiche|B|S|F|ebv|2,11|5
Sorbus aucuparia|Vogelbeere;Eberesche|B|SH|TF|evbf|4,2,11|5
Prunus avium|Vogel-Kirsche;Vogelkirsche;Wildkirsche|B|S|F|ebvn|2,4,16|4
Malus domestica|Kultur-Apfel;Apfel;Apfelbaum|B|S|F|bn|16|4-5
Celtis australis|Zürgelbaum;Südlicher Zürgelbaum|B|S|TF||2|4
Parrotia persica|Eisenholz;Persisches Eisenholz;Parrotie|S|SH|F|f|2,3|2-3
Liquidambar styraciflua|Amberbaum|B|S|F|f|2|5
Gleditsia triacanthos|Lederhülsenbaum;Gleditschie|B|S|TF|d|2|6
Robinia pseudoacacia|Robinie;Scheinakazie|B|S|T|gxb|2|5-6
Juglans regia|Walnuss;Nussbaum|B|S|F|n|16,2|5
Magnolia x soulangeana|Tulpen-Magnolie;Tulpenmagnolie;Magnolie|S|SH|F||3,2|4
Ginkgo biloba|Ginkgo;Fächerblattbaum|B|S|TF|f|2|
Salix caprea|Sal-Weide;Salweide|S|SH|FN|eb|4,11|3-4
Salix purpurea|Purpur-Weide;Purpurweide|S|S|FN|eb|4,12|3
Alnus glutinosa|Schwarz-Erle;Schwarzerle|B|SH|N|e|12,4|3
Taxus baccata|Eibe;Gewöhnliche Eibe|S|SHX|F|iegh|1,8|3
Ilex aquifolium|Stechpalme;Stechhülse|S|HX|F|iegdhv|1,8|5
Ligustrum vulgare|Gewöhnlicher Liguster;Liguster|S|SH|TF|ehqvb|1,4|6
Buxus sempervirens|Buchs;Buchsbaum|S|SH|F|igh|1,17|3
Prunus laurocerasus|Kirschlorbeer|S|SHX|F|igxh|1|5
Thuja occidentalis|Thuja;Lebensbaum;Abendländischer Lebensbaum|S|SH|F|igh|1|
Prunus spinosa|Schwarzdorn;Schlehe|S|S|TF|edvb|4,11|4
Crataegus monogyna|Eingriffeliger Weissdorn;Weissdorn|S|S|TF|edvbh|4,1|5
Rosa canina|Hunds-Rose;Hundsrose|S|S|TF|edvb|4,5|6
Corylus avellana|Hasel;Haselnuss;Haselstrauch|S|SH|F|enb|4,16|2-3
Cornus mas|Kornelkirsche;Tierlibaum|S|SH|TF|ebnv|4,3|2-3
Cornus sanguinea|Roter Hartriegel;Blutroter Hartriegel|S|SH|F|ev|4|5-6
Cornus alba|Tatarischer Hartriegel;Weisser Hartriegel|S|SH|FN||3,12|5
Sambucus nigra|Schwarzer Holunder;Holunder|S|SH|F|evbn|4,16|6
Viburnum opulus|Gewöhnlicher Schneeball;Wasser-Schneeball;Schneeball|S|SH|FN|evbq|4|5-6
Viburnum lantana|Wolliger Schneeball|S|SH|T|evbk|4|5
Euonymus europaeus|Pfaffenhütchen;Gewöhnliches Pfaffenhütchen|S|SH|F|egvf|4|5
Berberis vulgaris|Gewöhnliche Berberitze;Berberitze;Sauerdorn|S|S|T|edvb|4|5
Lonicera xylosteum|Rote Heckenkirsche;Heckenkirsche|S|HX|F|eqv|4,8|5
Amelanchier lamarckii|Kupfer-Felsenbirne;Felsenbirne|S|SH|F|bnfv|3|4
Forsythia x intermedia|Forsythie;Goldglöckchen|S|SH|F||3|3-4
Philadelphus coronarius|Pfeifenstrauch;Falscher Jasmin;Bauernjasmin|S|SH|F|b|3|6
Syringa vulgaris|Flieder;Gewöhnlicher Flieder|S|S|F|b|3|5
Hydrangea macrophylla|Garten-Hortensie;Gartenhortensie;Hortensie;Bauernhortensie|S|H|F||3,17|6-8
Hamamelis x intermedia|Zaubernuss|S|SH|F|b|3|1-3
Viburnum x bodnantense|Winter-Schneeball;Winterschneeball;Duft-Schneeball|S|SH|F|b|3|11-3
Buddleja davidii|Sommerflieder;Schmetterlingsflieder|S|S|T|xb|3|7-9
Rhododendron catawbiense|Rhododendron;Catawba-Rhododendron|S|HX|F|ig|3,8|5
Laburnum anagyroides|Goldregen|S|S|F|gb|3|5
Daphne mezereum|Seidelbast;Gewöhnlicher Seidelbast|Z|HX|F|egb|8|2-3
Skimmia japonica|Skimmie|Z|HX|F|ig|8,13,17|4
Lavandula angustifolia|Echter Lavendel;Lavendel|Z|S|T|ibk|10,16,9|6-8
Rosmarinus officinalis|Rosmarin|Z|S|T|ib|16,17|4-5
Salvia officinalis|Echter Salbei;Küchensalbei;Salbei|Z|S|T|ib|16,10|6
Thymus vulgaris|Echter Thymian;Thymian|Z|S|T|ibk|16,10|6
Thymus serpyllum|Sand-Thymian;Feld-Thymian;Quendel|Z|S|T|eibkc|10,7|6-7
Genista lydia|Steinginster;Lydischer Ginster|Z|S|T|bq|10|5-6
Pinus mugo|Berg-Föhre;Bergföhre;Legföhre;Latsche|S|S|T|ie|10,2|
Juniperus communis|Gewöhnlicher Wacholder;Wacholder|S|S|T|iek|10,4|
Calluna vulgaris|Besenheide;Heidekraut|Z|S|T|ieb|13,10|8-10
Erica carnea|Schneeheide;Winterheide|Z|SH|TF|iebkc|13,10,7|1-4
Cotoneaster dammeri|Teppich-Zwergmispel;Kriechende Zwergmispel;Zwergmispel|Z|SH|TF|ivbcq|7|5-6
Hedera helix|Efeu;Gemeiner Efeu|K|HX|F|iesvbgc|6,7,8|9-10
Parthenocissus tricuspidata|Dreispitz-Jungfernrebe;Dreispitzige Jungfernrebe;Wilder Wein;Mauerkatze|K|SHX|F|sfq|6|6
Hydrangea anomala subsp. petiolaris|Kletter-Hortensie;Kletterhortensie|K|HX|F|sb|6|6
Wisteria sinensis|Blauregen;Glyzinie;Chinesischer Blauregen|K|S|F|wgb|6|5
Lonicera periclymenum|Wald-Geissblatt;Waldgeissblatt;Geissblatt|K|SH|F|webvq|6,11|6-8
Lonicera henryi|Immergrünes Geissblatt;Henrys Geissblatt|K|HX|F|wiq|6|6
Clematis montana|Berg-Waldrebe;Anemonen-Waldrebe|K|SH|F|rqb|6|5
Clematis vitalba|Gewöhnliche Waldrebe;Waldrebe|K|SH|F|reqb|6,4|7
Aristolochia macrophylla|Pfeifenwinde|K|HX|F|wg|6|6
Akebia quinata|Akebie;Klettergurke|K|SH|F|w|6|4
Humulus lupulus|Hopfen;Echter Hopfen|K|SH|F|we|6,16|7
Vitis vinifera|Weinrebe;Rebe;Echte Weinrebe|K|S|F|rn|6,16|6
Rosa 'New Dawn'|Kletterrose 'New Dawn';Kletterrose|K|S|F|rdb|5,6|6-9
Rosa rugosa|Kartoffel-Rose;Kartoffelrose;Apfelrose|S|S|TF|dbv|5|6-9
Rosa 'Bonica'|Beetrose 'Bonica';Strauchrose 'Bonica';Bonica|S|S|F|db|5|6-9
Pachysandra terminalis|Ysander;Dickmännchen;Schattengrün|T|HX|F|ic|7,8|4
Vinca minor|Kleines Immergrün;Immergrün|T|HX|F|icq|7,8|4
Geranium macrorrhizum|Felsen-Storchschnabel;Balkan-Storchschnabel|T|SHX|TF|icb|7,8|5-6
Waldsteinia ternata|Golderdbeere;Waldsteinie|T|HX|F|icb|7|4-5
Epimedium x versicolor|Elfenblume|T|HX|TF|ic|7,8|4
Hosta sieboldiana|Blauschatten-Funkie;Blaublatt-Funkie;Funkie|T|HX|F||8|7
Heuchera micrantha|Purpurglöckchen|T|SH|F|ib|8,13,17|6
Helleborus niger|Christrose;Schneerose|T|HX|F|igbk|8|12-3
Pulmonaria officinalis|Echtes Lungenkraut;Lungenkraut|T|HX|F|eb|8,11|3-4
Anemone nemorosa|Busch-Windröschen;Buschwindröschen|T|HX|F|egb|8|3-4
Brunnera macrophylla|Kaukasus-Vergissmeinnicht|T|HX|F|b|8|4-5
Astilbe x arendsii|Prachtspiere;Astilbe|T|HX|FN||8|7
Aquilegia vulgaris|Gewöhnliche Akelei;Akelei|T|SH|F|egb|8,11|5-6
Digitalis purpurea|Roter Fingerhut;Fingerhut|T|H|F|egb|8|6-7
Aconitum napellus|Blauer Eisenhut;Eisenhut|T|SH|FN|egb|8|7-8
Convallaria majalis|Maiglöckchen|T|HX|F|eg|8|5
Alchemilla mollis|Weicher Frauenmantel;Frauenmantel|T|SH|F|c|9,7,8|6
Echinacea purpurea|Roter Sonnenhut;Purpur-Sonnenhut;Scheinsonnenhut|T|S|TF|b|9|7-9
Rudbeckia fulgida|Gewöhnlicher Sonnenhut;Gelber Sonnenhut;Leuchtender Sonnenhut|T|S|F|b|9|7-9
Salvia nemorosa|Steppen-Salbei;Steppensalbei;Hain-Salbei|T|S|T|b|9,10|6-9
Salvia pratensis|Wiesen-Salbei;Wiesensalbei|T|S|T|ebk|11,9|5-7
Nepeta x faassenii|Katzenminze|T|S|T|b|9,10|5-9
Centranthus ruber|Rote Spornblume;Spornblume|T|S|T|bk|10,9|5-9
Achillea millefolium|Gewöhnliche Schafgarbe;Schafgarbe|T|S|T|eb|11,9|6-9
Origanum vulgare|Echter Dost;Dost;Oregano;Wilder Majoran|T|S|T|ebkn|11,16,10|7-9
Sedum telephium|Hohe Fetthenne;Grosse Fetthenne;Fetthenne|T|S|T|b|9,10|8-10
Aster novae-angliae|Raublatt-Aster;Raublattaster;Neuengland-Aster|T|S|F|b|9|9-10
Geranium sanguineum|Blut-Storchschnabel;Blutstorchschnabel|T|S|T|eb|10,9|5-8
Paeonia lactiflora|Pfingstrose;Chinesische Pfingstrose|T|S|F|q|9|5-6
Stachys byzantina|Woll-Ziest;Wollziest;Eselsohr|T|S|T|bc|10,9|6-8
Oenothera lindheimeri|Prachtkerze|T|S|T|b|9,13|7-10
Knautia arvensis|Acker-Witwenblume;Witwenblume|T|S|T|eb|11|6-8
Centaurea jacea|Wiesen-Flockenblume;Flockenblume|T|S|TF|eb|11|6-9
Leucanthemum vulgare|Wiesen-Margerite;Margerite|T|S|F|eb|11|5-7
Lythrum salicaria|Blut-Weiderich;Blutweiderich|T|S|NW|eb|12|7-8
Caltha palustris|Sumpf-Dotterblume;Sumpfdotterblume|T|SH|NW|egb|12|4-5
Iris pseudacorus|Sumpf-Schwertlilie;Gelbe Schwertlilie|T|SH|NW|egb|12|5-6
Typha minima|Zwerg-Rohrkolben;Zwergrohrkolben|T|S|W|e|12|
Nymphaea alba|Weisse Seerose;Seerose|W|S|W|e|12|6-8
Nymphoides peltata|Seekanne|W|S|W|e|12|7-8
Ceratophyllum demersum|Raues Hornblatt;Hornblatt|W|SH|W|e|12|
Myriophyllum spicatum|Ähriges Tausendblatt;Tausendblatt|W|SH|W|e|12|
Sempervivum tectorum|Echte Hauswurz;Hauswurz;Dachwurz|T|S|T|ibk|10|7
Sedum acre|Scharfer Mauerpfeffer;Mauerpfeffer|T|S|T|eibkqc|10,7|6
Aubrieta x cultorum|Blaukissen|T|S|T|ibkc|10|4-5
Aurinia saxatilis|Felsen-Steinkraut;Steinkraut;Goldkörbchen|T|S|T|bk|10|4-5
Dianthus gratianopolitanus|Pfingst-Nelke;Pfingstnelke|T|S|T|eibk|10|5-6
Phlox subulata|Polster-Phlox;Teppich-Phlox|T|S|T|ibc|10,7|4-5
Pulsatilla vulgaris|Gewöhnliche Küchenschelle;Küchenschelle;Kuhschelle|T|S|T|egbk|10,11|3-4
Pennisetum alopecuroides|Lampenputzergras;Federborstengras|G|S|F||15|8-9
Festuca glauca|Blau-Schwingel;Blauschwingel|G|S|T|i|15,10|6
Stipa tenuissima|Zartes Federgras;Mexikanisches Federgras;Federgras|G|S|T||15,10,17|6-8
Sesleria caerulea|Kalk-Blaugras;Blaugras|G|SH|T|eik|15,10|3-4
Miscanthus sinensis|Chinaschilf;Chinesisches Schilf|G|S|F||15|9
Calamagrostis x acutiflora|Garten-Reitgras;Reitgras|G|S|F||15|7
Carex morrowii|Japan-Segge;Japansegge|G|HX|F|ic|15,8,7|
Hakonechloa macra|Japanwaldgras;Japan-Waldgras|G|H|F|f|15,8,17|
Dryopteris filix-mas|Gewöhnlicher Wurmfarn;Wurmfarn|F|HX|F|e|15,8|
Athyrium filix-femina|Wald-Frauenfarn;Frauenfarn|F|HX|FN|e|15,8|
Polystichum setiferum|Weicher Schildfarn;Schildfarn|F|HX|F|i|15,8|
Matteuccia struthiopteris|Straussenfarn;Straussfarn;Trichterfarn|F|HX|FN|e|15,8|
Galanthus nivalis|Schneeglöckchen|O|HX|F|egb|14|2-3
Crocus tommasinianus|Elfen-Krokus;Elfenkrokus;Dalmatiner Krokus|O|SH|F|b|14|2-3
Crocus vernus|Frühlings-Krokus;Frühlingskrokus;Krokus|O|SH|F|eb|14|3
Eranthis hyemalis|Winterling|O|SH|F|gb|14|2-3
Scilla siberica|Sibirischer Blaustern;Blaustern|O|SH|F|bq|14|3
Muscari armeniacum|Traubenhyazinthe;Armenische Traubenhyazinthe|O|S|TF|b|14|4
Tulipa gesneriana|Garten-Tulpe;Gartentulpe;Tulpe|O|S|F|q|14,13|4-5
Narcissus pseudonarcissus|Osterglocke;Gelbe Narzisse;Narzisse|O|SH|F|eg|14|3-4
Allium aflatunense|Zier-Lauch;Zierlauch;Kugel-Lauch|O|S|TF|b|14,9|5
Leucojum vernum|Märzenbecher;Frühlings-Knotenblume|O|HX|FN|eg|14|2-3
Canna indica|Indisches Blumenrohr;Blumenrohr|O|S|F||14,13,17|7-10
Dahlia x hortensis|Dahlie;Garten-Dahlie;Georgine|O|S|F|b|14,13|7-10
Viola x wittrockiana|Garten-Stiefmütterchen;Gartenstiefmütterchen;Stiefmütterchen|E|SH|F||13|3-5
Bellis perennis|Tausendschön;Gänseblümchen|E|SH|F|e|13|3-5
Myosotis sylvatica|Wald-Vergissmeinnicht;Waldvergissmeinnicht;Vergissmeinnicht|E|SH|F|eb|13|4-5
Pelargonium zonale|Geranie;Zonal-Pelargonie;Pelargonie|E|S|T||13,17|5-10
Petunia x atkinsiana|Petunie|E|S|F||13|5-10
Tagetes patula|Studentenblume;Tagetes;Samtblume|E|S|F||13|6-10
Begonia semperflorens|Eis-Begonie;Eisbegonie;Begonie|E|SH|F||13|5-10
Salvia guaranitica|Südamerika-Salbei;Guarani-Salbei;Anis-Salbei|E|S|F|b|13,17|7-10
Cosmos bipinnatus|Schmuckkörbchen;Cosmea|E|S|F|b|13|7-10
Olea europaea|Olivenbaum;Olive;Echter Ölbaum|U|S|T|i|17|
Laurus nobilis|Echter Lorbeer;Lorbeer;Gewürzlorbeer|U|SH|F|ih|17,16|
Nerium oleander|Oleander|U|S|F|ig|17|6-9
Citrus limon|Zitrone;Zitronenbaum|U|S|F|in|17|
Agapanthus umbellatus|Afrika-Schmucklilie;Schmucklilie;Agapanthus;Afrikanische Liebesblume|U|S|F||17|7-8
Trachycarpus fortunei|Hanfpalme;Chinesische Hanfpalme|U|SH|F|i|17|
Rubus idaeus|Himbeere|S|SH|F|endb|16|6
Ribes rubrum|Rote Johannisbeere;Johannisbeere|S|SH|F|nb|16|4-5
Ribes uva-crispa|Stachelbeere|S|SH|F|ndb|16|4
Fragaria vesca|Wald-Erdbeere;Walderdbeere|T|SH|F|enbc|16,7|5-6
Vaccinium corymbosum|Kultur-Heidelbeere;Heidelbeere;Amerikanische Heidelbeere|S|SH|F|nbf|16|5
Mentha spicata|Grüne Minze;Minze|T|SH|FN|bn|16|7
Allium schoenoprasum|Schnittlauch|T|SH|F|bn|16|6
Pennisetum orientale|Orient-Lampenputzergras;Orientalisches Lampenputzergras|G|S|T||15,10|6-9
Helictotrichon sempervirens|Blaustrahlhafer|G|S|T|i|15,10|6-7
Luzula sylvatica|Wald-Hainsimse;Waldmarbel|G|HX|F|eic|15,8,7|4-5
Carex pendula|Hänge-Segge;Riesen-Segge|G|HX|FN|ei|15,8,12|5-6
Lonicera nitida|Heckenmyrte;Immergrüne Heckenkirsche|S|SHX|F|ihq|1|4-5
Ilex crenata|Japanische Hülse;Japanische Stechpalme|S|SH|F|ihq|1,17|6
Actinidia arguta|Mini-Kiwi;Scharfzähniger Strahlengriffel|K|SH|F|wn|6,16|6
Ocimum basilicum|Basilikum|E|S|F|n|16,17|7`;
window.SYN={'Hydrangea petiolaris':'Hydrangea anomala subsp. petiolaris','Hylotelephium telephium':'Sedum telephium','Gaura lindheimeri':'Oenothera lindheimeri','Salvia rosmarinus':'Rosmarinus officinalis','Agapanthus africanus':'Agapanthus umbellatus','Aster novi-belgii':'Aster novae-angliae','Symphyotrichum novae-angliae':'Aster novae-angliae'};
window.GRUPPEN=['','Form- und Sichtschutzhecken','Solitärgehölze, Hausbäume','Blüten- und Ziergehölze','Einheimische Wildhecken','Rosen','Kletterpflanzen','Bodendecker','Schatten und Gehölzrand','Sonnenstauden, Blühbeete','Trocken- und Steingarten','Ökologische Aufwertung','Sumpf- und Wasserpflanzen','Wechselflor','Zwiebel- und Knollengewächse','Ziergräser und Farne','Nutzpflanzen, Obst, Kräuter','Kübel- und Gefässpflanzen'];
