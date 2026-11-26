/* Situationen: jede Frage hat Kriterien, gegen die der Coach jede Pflanze prüft.
   typ: erlaubte Typen · licht/boden: geforderter Standort · has: alle Merkmale nötig · any: eines davon · not: verboten · grp: Verwendungsgruppe · bl: Blütemonate */
window.FAELLE=[
{id:'schule',icon:'🏫',titel:'Pausenplatz einer Primarschule',text:'Sonnig bis halbschattig, normaler Gartenboden. Hier spielen jeden Tag 200 Kinder. Die Gemeinde wünscht robuste Pflanzen, Schatten und etwas zum Naschen.',fragen:[
 {q:'2 ungiftige, robuste Sträucher',n:2,k:{typ:['S'],licht:'S',not:['g','q','x','d']}},
 {q:'1 Baum als Schattenspender',n:1,k:{typ:['B'],licht:'S',not:['g','x']}},
 {q:'2 Naschpflanzen für die Kinder',n:2,k:{has:['n'],not:['g','x']}},
 {q:'2 stark giftige Pflanzen, die hier NICHT hingehören',n:2,k:{has:['g']},umkehr:true}]},
{id:'nord',icon:'🏢',titel:'Nordfassade eines Mehrfamilienhauses',text:'Schattig, kühl, frischer Boden. Die Fassade soll ohne Gerüst grün werden. Am Fuss liegt ein 1 m breiter Streifen, der pflegeleicht sein soll.',fragen:[
 {q:'2 Selbstklimmer für die schattige Wand',n:2,k:{typ:['K'],has:['s'],licht:'X'}},
 {q:'2 immergrüne Bodendecker für den Schattenstreifen',n:2,k:{grp:[7],has:['i'],licht:'X'}},
 {q:'2 Schattenpflanzen mit schönem Blatt (Stauden, Farne, Gräser)',n:2,k:{typ:['T','F','G'],licht:'X'}}]},
{id:'dach',icon:'🏙️',titel:'Dachterrasse in der Stadt',text:'Vollsonnig, heiss und windig. Alles wächst in Töpfen. Der Kunde liebt das Mittelmeer und kocht gern.',fragen:[
 {q:'2 mediterrane Kübelpflanzen (nicht winterhart)',n:2,k:{typ:['U']}},
 {q:'2 Küchenkräuter, die Halbsträucher sind',n:2,k:{typ:['Z'],grp:[16]}},
 {q:'2 Ziergräser für sonnig und trocken',n:2,k:{typ:['G'],licht:'S',boden:'T'}}]},
{id:'hecke',icon:'🐦',titel:'Wildhecke am Siedlungsrand',text:'Sonnig, normaler Boden. Die Gemeinde will eine 30 m lange Hecke für Vögel und Insekten. Davor soll ein blühender Saum entstehen.',fragen:[
 {q:'2 einheimische Sträucher mit Dornen',n:2,k:{typ:['S'],has:['e','d']}},
 {q:'2 einheimische Vogelnährgehölze',n:2,k:{typ:['S','B'],has:['e','v']}},
 {q:'2 einheimische Wildstauden für den Saum',n:2,k:{typ:['T'],has:['e','b'],licht:'S'}},
 {q:'1 Pflanze, die NICHT in die Hecke gehört, weil sie invasiv ist',n:1,k:{has:['x']},umkehr:true}]},
{id:'teich',icon:'🐸',titel:'Gartenteich mit Sumpfzone',text:'Sonnig. Ein Familiengarten erhält einen Teich mit flacher Sumpfzone, tiefer Wasserzone und feuchtem Ufer.',fragen:[
 {q:'2 Pflanzen für die Sumpfzone (Flachwasser)',n:2,k:{typ:['T'],boden:'W'}},
 {q:'2 Schwimmblatt- oder Unterwasserpflanzen',n:2,k:{typ:['W']}},
 {q:'1 Gehölz für das feuchte Ufer',n:1,k:{typ:['S','B'],boden:'N'}}]},
{id:'laubbaum',icon:'🌳',titel:'Vorgarten unter einem alten Laubbaum',text:'Im Sommer schattig, im Frühling hell. Die Kundin möchte schon im Februar Blüten für Bienen sehen.',fragen:[
 {q:'2 Zwiebel- oder Knollenpflanzen für den Vorfrühling (Februar/März)',n:2,k:{typ:['O'],bl:[2,3]}},
 {q:'1 Gehölz, das im Winter oder Vorfrühling blüht',n:1,k:{typ:['S','Z','B'],bl:[12,1,2]}},
 {q:'2 Schattenstauden mit Blüte im Frühling',n:2,k:{typ:['T'],licht:'X',bl:[2,3,4]}}]},
{id:'mauer',icon:'🧱',titel:'Trockenmauer und Steingarten am Südhang',text:'Vollsonnig und heiss, magerer, kalkhaltiger und sehr durchlässiger Boden.',fragen:[
 {q:'2 Polsterpflanzen für die Mauerfugen',n:2,k:{typ:['T','Z'],grp:[10],licht:'S',boden:'T'}},
 {q:'1 Zwerggehölz oder Nadelgehölz für den Steingarten',n:1,k:{typ:['Z','S'],grp:[10]}},
 {q:'2 Ziergräser für trockene Standorte',n:2,k:{typ:['G'],boden:'T'}}]},
{id:'sicht',icon:'🏘️',titel:'Sichtschutz im Reihenhausgarten',text:'Sonnig bis halbschattig, nur ca. 1 m Platz. Das Paar wünscht ganzjährig Sichtschutz, aber keinen Kirschlorbeer und keine Thuja.',fragen:[
 {q:'2 immergrüne, schnittverträgliche Heckenpflanzen',n:2,k:{has:['i','h'],not:['x'],nicht:['Thuja occidentalis','Prunus laurocerasus']}},
 {q:'1 einheimische Heckenpflanze (darf im Winter kahl oder braun sein)',n:1,k:{has:['e','h']}},
 {q:'2 Kletterpflanzen für einen Sichtschutzzaun',n:2,k:{typ:['K'],licht:'S'}}]},
{id:'bienen',icon:'🐝',titel:'Staudenbeet für Bienen und Schmetterlinge',text:'Vollsonnig, durchlässiger Boden. Das Beet soll vom Frühling bis in den Herbst blühen und Insekten Futter geben.',fragen:[
 {q:'1 Zwiebelpflanze für Bienen im Frühling',n:1,k:{typ:['O'],has:['b'],bl:[2,3,4,5]}},
 {q:'2 Stauden mit Blüte im Frühsommer (Mai/Juni)',n:2,k:{typ:['T'],has:['b'],licht:'S',bl:[5,6]}},
 {q:'2 Stauden mit Blüte im Spätsommer und Herbst',n:2,k:{typ:['T'],has:['b'],licht:'S',bl:[8,9,10]}}]},
{id:'beiz',icon:'🍽️',titel:'Wechselflor beim Eingang eines Restaurants',text:'Sonnig, Kübel und Schalen links und rechts der Türe. Der Wirt lässt dreimal pro Jahr neu bepflanzen.',fragen:[
 {q:'2 Pflanzen für den Frühlingsflor',n:2,k:{grp:[13,14],bl:[3,4]}},
 {q:'2 Pflanzen für den Sommerflor',n:2,k:{grp:[13],licht:'S',bl:[7,8]}},
 {q:'1 wintergrüne Pflanze für die Herbst- und Winterschale',n:1,k:{grp:[13],has:['i']}}]},
{id:'kiga',icon:'🧸',titel:'Garten eines Kindergartens',text:'Sonnig, normaler Boden. Die Kinder dürfen alles anfassen. Die Leiterin wünscht Farbe, Duft und etwas zum Probieren.',fragen:[
 {q:'2 ungiftige, blühende Stauden',n:2,k:{typ:['T'],licht:'S',not:['g','q']}},
 {q:'2 Beerensträucher zum Naschen',n:2,k:{typ:['S'],has:['n'],not:['g']}},
 {q:'1 duftendes Küchenkraut',n:1,k:{grp:[16],typ:['Z','T'],licht:'S'}}]},
{id:'hausbaum',icon:'🏡',titel:'Hausbaum für einen kleinen Garten',text:'Sonnig, normaler Boden. Der Baum soll den Sitzplatz beschatten und im Herbst leuchten.',fragen:[
 {q:'1 Baum oder Grossstrauch mit schöner Herbstfärbung',n:1,k:{typ:['B','S'],has:['f'],licht:'S'}},
 {q:'1 einheimischer Baum, der auch Vögeln nützt',n:1,k:{typ:['B'],has:['e','v']}},
 {q:'1 Baum, der wegen Gift oder Invasivität NICHT in den Garten passt',n:1,k:{typ:['B','S'],any:['g','x']},umkehr:true}]},
{id:'boeschung',icon:'⛰️',titel:'Sonnige Böschung an der Strasse',text:'Sonnig, trocken, schwer zu pflegen. Die Böschung soll schnell und dicht zuwachsen.',fragen:[
 {q:'2 Bodendecker für sonnige, trockene Lagen',n:2,k:{grp:[7,10],licht:'S',boden:'T',has:['c']}},
 {q:'1 einheimische Wildstaude für Insekten',n:1,k:{typ:['T'],has:['e','b'],boden:'T'}}]},
{id:'pergola',icon:'🌿',titel:'Pergola beim Sitzplatz',text:'Sonnig und warm. Die Pergola aus Holz soll im Sommer Schatten geben und duften oder blühen.',fragen:[
 {q:'2 Schlinger oder Ranker für die sonnige Pergola',n:2,k:{typ:['K'],any:['w','r'],licht:'S'}},
 {q:'1 Kletterpflanze mit Früchten zum Essen',n:1,k:{typ:['K'],has:['n']}}]},
{id:'schatten',icon:'🌲',titel:'Schattiger Waldgarten unter Bäumen',text:'Tiefer Schatten, frischer Humusboden. Die Kundin möchte es natürlich wie im Wald.',fragen:[
 {q:'2 Farne',n:2,k:{typ:['F'],licht:'X'}},
 {q:'1 Gras oder Segge für den Schatten',n:1,k:{typ:['G'],licht:'X'}},
 {q:'2 einheimische Schattenpflanzen',n:2,k:{licht:'X',has:['e'],typ:['T','F','O','Z']}}]}
];
