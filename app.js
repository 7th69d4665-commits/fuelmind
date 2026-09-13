(function(){
'use strict';
if(window.top!==window.self){document.body.replaceChildren();var frameMsg=document.createElement('div');frameMsg.style.cssText='padding:24px;color:#fff;background:#07131f;font-family:sans-serif';frameMsg.textContent='لأمان بياناتك، FuelMind لا يعمل داخل إطار مضمّن.';document.body.appendChild(frameMsg);return;}
var Core=window.FuelMindCore;if(!Core)throw new Error('FuelMindCore غير محمّل');

var DEFAULT_CATEGORIES = [
  {group:"البيت والمعيشة",name:"تموين وبقالة أساسية",kind:"flex",desc:"المواد الغذائية الأساسية واحتياجات المطبخ اليومية.",examples:"أرز، حليب، خبز، زيت، سكر، معلبات",keywords:["بقالة","سوبرماركت","رز","أرز","حليب","خبز","زيت","سكر","معلبات","تموين"]},
  {group:"البيت والمعيشة",name:"خضار وفواكه",kind:"flex",desc:"الخضار والفواكه والمواد الطازجة المخصصة للمنزل.",examples:"طماطم، خيار، بطاطس، موز، تفاح",keywords:["خضار","فواكه","طماطم","خيار","بطاطس","موز","تفاح","برتقال"]},
  {group:"البيت والمعيشة",name:"لحوم ودواجن وأسماك",kind:"flex",desc:"اللحوم والدجاج والأسماك والمواد البروتينية المنزلية.",examples:"لحم، دجاج، سمك، روبيان",keywords:["لحم","لحوم","دجاج","سمك","أسماك","روبيان"]},
  {group:"البيت والمعيشة",name:"مياه ومشروبات منزلية",kind:"flex",desc:"المياه والمشروبات التي تُشترى للمنزل والأسرة عمومًا.",examples:"كرتون ماء، عصائر عائلية، مشروبات منزلية",keywords:["كرتون ماء","موية","ماء","عصير عائلي","مشروبات منزلية"]},
  {group:"البيت والمعيشة",name:"منظفات ومستلزمات منزلية",kind:"flex",desc:"مواد التنظيف والاستهلاك المنزلي غير الغذائي.",examples:"مناديل، صابون، مسحوق غسيل، أكياس نفايات",keywords:["مناديل","صابون","مسحوق","غسيل","منظف","كلور","أكياس نفايات","سائل صحون"]},
  {group:"البيت والمعيشة",name:"أدوات وصيانة منزلية بسيطة",kind:"oneoff",desc:"الأدوات المنزلية الصغيرة أو الإصلاحات غير الدورية.",examples:"لمبات، مفاتيح، أدوات مطبخ، إصلاح بسيط",keywords:["لمبة","لمبات","أداة منزل","أدوات منزل","صيانة منزل","سباك","كهربائي"]},

  {group:"الأبناء",name:"سناكات وحلويات الأبناء",kind:"flex",desc:"المأكولات والمشروبات الاختيارية المشتراة للأبناء تحديدًا.",examples:"بسكوت، آيسكريم، حلاو، عصير، تشيبس",keywords:["بسكوت","بسكويت","ايسكريم","آيسكريم","حلاو","حلويات","تشيبس","شيبس","عصير للاولاد","عصير للأطفال","سناك","سناكات"]},
  {group:"الأبناء",name:"مصروف المدرسة اليومي",kind:"flex",desc:"المبالغ اليومية أو الأسبوعية التي تُعطى للأبناء للمدرسة.",examples:"مصروف يومي، مقصف، مبلغ المدرسة",keywords:["مصروف مدرسة","مقصف","مصروف يومي للولد","مصروف يومي للبنت"]},
  {group:"الأبناء",name:"تعليم وقرطاسية",kind:"oneoff",desc:"الأدوات والرسوم والمواد التعليمية غير اليومية.",examples:"دفاتر، أقلام، كتب، رسوم نشاط",keywords:["قرطاسية","دفاتر","أقلام","كتب","رسوم مدرسة","نشاط مدرسي"]},
  {group:"الأبناء",name:"ملابس وأحذية الأبناء",kind:"oneoff",desc:"الملابس والأحذية والزي المدرسي الخاص بالأبناء.",examples:"ثوب، حذاء، زي مدرسي، ملابس أطفال",keywords:["ملابس أطفال","ملابس الابناء","ملابس الأبناء","حذاء طفل","زي مدرسي","ثوب للولد"]},
  {group:"الأبناء",name:"ألعاب وترفيه الأبناء",kind:"flex",desc:"الألعاب والأنشطة الترفيهية والخروج المخصص للأطفال.",examples:"مدينة ألعاب، لعبة، فعالية أطفال",keywords:["لعبة","ألعاب أطفال","مدينة ألعاب","ترفيه أطفال","فعالية أطفال"]},
  {group:"الأبناء",name:"احتياجات رضيع",kind:"flex",desc:"الاحتياجات اليومية أو المتكررة للرضيع.",examples:"حفاضات، مناديل أطفال، حليب أطفال",keywords:["حفاض","حفاضات","بامبرز","حليب أطفال","حليب رضيع","مناديل أطفال"]},

  {group:"الطعام خارج المنزل",name:"مطاعم عائلية",kind:"flex",desc:"وجبات المطاعم التي تكون للأسرة أو للخروج العائلي.",examples:"غداء عائلي، عشاء، وجبة مطعم",keywords:["مطعم","غداء عائلي","عشاء عائلي","وجبة عائلية"]},
  {group:"الطعام خارج المنزل",name:"وجبات أثناء العمل",kind:"flex",desc:"وجبات أو سناكات مرتبطة بيوم العمل.",examples:"فطور العمل، غداء الدوام",keywords:["الدوام","العمل","فطور الدوام","غداء الدوام"]},
  {group:"الطعام خارج المنزل",name:"مقاهي ومشروبات",kind:"flex",desc:"القهوة والمشروبات الجاهزة من المقاهي.",examples:"قهوة، شاي، مشروب بارد",keywords:["قهوة","كوفي","مقهى","كابتشينو","لاتيه","شاي"]},
  {group:"الطعام خارج المنزل",name:"توصيل وطلبات",kind:"flex",desc:"طلبات الطعام عبر تطبيقات التوصيل.",examples:"جاهز، هنقرستيشن، مرسول",keywords:["جاهز","هنقرستيشن","مرسول","توصيل","طلب أكل"]},

  {group:"المركبات والتنقل",name:"وقود",kind:"flex",desc:"البنزين أو الوقود للمركبات.",examples:"بنزين للدودج، بنزين للهايلاندر",keywords:["بنزين","وقود","محطة"]},
  {group:"المركبات والتنقل",name:"غسيل وعناية بالمركبة",kind:"flex",desc:"غسيل السيارة والتلميع والخدمات البسيطة المتكررة.",examples:"غسيل، تلميع",keywords:["غسيل سيارة","مغسلة","تلميع"]},
  {group:"المركبات والتنقل",name:"مواقف وتنقلات",kind:"flex",desc:"المواقف وأجور النقل والتنقل اليومي.",examples:"مواقف، تاكسي، أوبر",keywords:["موقف","مواقف","اوبر","أوبر","تاكسي","كريم"]},
  {group:"المركبات والتنقل",name:"صيانة وإصلاح المركبة",kind:"oneoff",desc:"الصيانة وقطع الغيار والإطارات والإصلاحات.",examples:"زيت، كفرات، بطارية، قطع غيار",keywords:["صيانة","زيت سيارة","كفر","كفرات","بطارية","قطع غيار","إصلاح سيارة"]},
  {group:"المركبات والتنقل",name:"تأمين وفحص وتجديد",kind:"oneoff",desc:"التأمين والفحص الدوري وتجديد الاستمارة ورسوم المركبة.",examples:"تأمين، فحص دوري، استمارة",keywords:["تأمين سيارة","فحص دوري","استمارة","تجديد سيارة"]},

  {group:"العقارات والمرافق",name:"كهرباء",kind:"fixed",desc:"فاتورة الكهرباء مرتبطة بعقار وعداد محدد.",examples:"عداد بيتي 1، عداد بيتي 2، عداد بيت أمي",keywords:["كهرباء","فاتورة كهرباء","عداد"]},
  {group:"العقارات والمرافق",name:"مياه شبكة",kind:"fixed",desc:"فاتورة مياه الشبكة المرتبطة بعقار محدد.",examples:"فاتورة مياه بيتي، فاتورة مياه بيت أمي",keywords:["فاتورة ماء","فاتورة مياه","مياه شبكة"]},
  {group:"العقارات والمرافق",name:"مياه صهريج/تريلة",kind:"flex",desc:"شراء مياه بواسطة صهريج أو تريلة لعقار محدد.",examples:"تريلة موية لعمارة أبوي",keywords:["تريلة موية","تريله موية","صهريج","وايت موية","موية للعمارة"]},
  {group:"العقارات والمرافق",name:"نظافة عقار/عمارة",kind:"fixed",desc:"أجرة عامل نظافة لعقار أو عمارة بصورة دورية.",examples:"عامل نظافة عمارة أبوي",keywords:["عامل نظافة عمارة","نظافة العمارة","عامل العمارة"]},
  {group:"العقارات والمرافق",name:"صيانة وإصلاح عقار",kind:"oneoff",desc:"إصلاحات وصيانة مرتبطة بمنزل أو عمارة.",examples:"سباكة، كهربائي، إصلاح مضخة",keywords:["صيانة عمارة","صيانة بيت","سباك","كهربائي","اصلاح مضخة","إصلاح مضخة"]},
  {group:"العقارات والمرافق",name:"مستلزمات العقار",kind:"flex",desc:"مستلزمات تشغيل العقار غير الشخصية وغير الغذائية.",examples:"لمبات، مواد نظافة للعمارة، أدوات مشتركة",keywords:["مستلزمات العمارة","لمبات العمارة","مواد نظافة العمارة"]},
  {group:"العائلة والمجتمع",name:"مصروف بيت أمي",kind:"fixed",desc:"مبلغ عام مخصص لمصاريف بيت الوالدة عندما لا يكون بندًا محددًا مثل الكهرباء أو الماء.",examples:"مصروف شهري لبيت أمي",keywords:["مصروف بيت امي","مصروف بيت أمي","مصاريف بيت امي"]},
  
  {group:"الفواتير والاشتراكات",name:"جوال واتصالات",kind:"fixed",desc:"فواتير وخطط الجوال والاتصالات.",examples:"موبايلي، STC، زين",keywords:["موبايلي","stc","زين","فاتورة جوال","شحن جوال"]},
  {group:"الفواتير والاشتراكات",name:"إنترنت منزلي",kind:"fixed",desc:"اشتراكات الإنترنت أو الألياف للمنزل.",examples:"فايبر، 5G منزلي",keywords:["انترنت","إنترنت","فايبر","5g منزلي"]},
  {group:"الفواتير والاشتراكات",name:"اشتراكات رقمية",kind:"fixed",desc:"الخدمات الرقمية المتكررة.",examples:"iCloud، Netflix، تطبيقات",keywords:["icloud","نتفلكس","اشتراك تطبيق","اشتراك رقمي"]},

  {group:"الصحة",name:"صيدلية وأدوية",kind:"oneoff",desc:"الأدوية والمستلزمات الصيدلانية.",examples:"دواء، مسكن، فيتامين بوصفة",keywords:["صيدلية","دواء","أدوية","مسكن"]},
  {group:"الصحة",name:"عيادات وفحوصات",kind:"oneoff",desc:"رسوم الكشف والتحاليل والفحوصات الطبية.",examples:"كشف، تحليل، فحص",keywords:["عيادة","كشف","تحليل","تحاليل","فحص طبي"]},

  {group:"الالتزامات المالية",name:"قسط تمويل شخصي",kind:"fixed",desc:"القسط الشهري للتمويل الشخصي.",examples:"قسط البنك الشهري",keywords:["قسط شخصي","تمويل شخصي"]},
  {group:"الالتزامات المالية",name:"قسط تمويل عقاري",kind:"fixed",desc:"القسط الشهري للتمويل العقاري.",examples:"قسط المنزل",keywords:["قسط عقاري","تمويل عقاري"]},
  {group:"الالتزامات المالية",name:"سداد ديون أو سلف قديمة",kind:"oneoff",desc:"سداد مبالغ سابقة ليست مصروفًا تشغيليًا شهريًا.",examples:"رد سلفة، سداد دين قديم",keywords:["سلف","سلفة","دين قديم","سداد دين"]},

  {group:"الخدمات المنزلية",name:"عامل أو عاملة منزلية",kind:"fixed",desc:"المبالغ الدورية للعامل أو العاملة المنزلية.",examples:"راتب عامل، عامل نظافة",keywords:["عامل النظافة","عاملة منزلية","عامل منزلي","راتب عامل"]},
  {group:"الخدمات المنزلية",name:"خدمة منزلية غير دورية",kind:"oneoff",desc:"أجرة خدمة منزلية لا تتكرر شهريًا.",examples:"تنظيف إضافي، نقل أثاث",keywords:["تنظيف إضافي","نقل أثاث","خدمة منزلية"]},

  {group:"العائلة والمجتمع",name:"دعم عائلي دوري",kind:"fixed",desc:"مبالغ ثابتة أو شبه ثابتة تحول لأحد أفراد الأسرة.",examples:"تحويل شهري للوالدة",keywords:["تحويل للوالدة","تحويل للام","تحويل للأم","دعم شهري"]},
  {group:"العائلة والمجتمع",name:"هدايا ومناسبات",kind:"oneoff",desc:"الهدايا والمبالغ المرتبطة بالمناسبات.",examples:"هدية، زواج، مولود",keywords:["هدية","زواج","مولود","مناسبة"]},
  {group:"العائلة والمجتمع",name:"مساعدة أو تحويل غير دوري",kind:"oneoff",desc:"تحويل شخصي أو مساعدة لا تتكرر بصورة ثابتة.",examples:"مساعدة أحد الأقارب",keywords:["مساعدة","تحويل عائلي","تحويل لقريب"]},
  {group:"العائلة والمجتمع",name:"مساهمات وقطة",kind:"oneoff",desc:"مساهمات جماعية أو قطة عمل ومناسبات.",examples:"قطة الدوام، مساهمة جماعية",keywords:["قطة","مساهمة","مساهمات العمل"]},

  {group:"الشخصي والترفيه",name:"حلاقة وعناية شخصية",kind:"flex",desc:"الحلاقة والعناية الشخصية الروتينية.",examples:"حلاقة، صالون، عناية",keywords:["حلاقة","صالون","عناية شخصية"]},
  {group:"الشخصي والترفيه",name:"ملابس وأحذية شخصية",kind:"oneoff",desc:"الملابس والأحذية الخاصة بالكبار.",examples:"ثوب، شماغ، حذاء",keywords:["ثوب","شماغ","حذاء","ملابس شخصية"]},
  {group:"الشخصي والترفيه",name:"ترفيه شخصي",kind:"flex",desc:"الأنشطة والهوايات الشخصية الاختيارية.",examples:"سينما، ألعاب، نشاط ترفيهي",keywords:["سينما","ترفيه شخصي","هواية"]},
  {group:"الشخصي والترفيه",name:"مشتريات اختيارية",kind:"flex",desc:"مشتريات غير أساسية قابلة للتأجيل.",examples:"إكسسوارات، كماليات",keywords:["كماليات","اكسسوارات","إكسسوارات","مشتريات اختيارية"]},

  {group:"الرسوم والاستثنائي",name:"مخالفات مرورية",kind:"oneoff",desc:"المخالفات المرورية والمدفوعات المرتبطة بها.",examples:"سداد مخالفة",keywords:["مخالفة","مخالفات","مرور"]},
  {group:"الرسوم والاستثنائي",name:"رسوم حكومية",kind:"oneoff",desc:"الرسوم الحكومية والتجديدات الرسمية غير المتكررة.",examples:"رسوم منصة أو خدمة حكومية",keywords:["رسوم حكومية","أبشر","رسوم تجديد"]},
  {group:"الرسوم والاستثنائي",name:"طوارئ",kind:"oneoff",desc:"مصروف طارئ فعلي لا ينتمي إلى بند واضح.",examples:"حالة طارئة",keywords:["طوارئ","طارئ"]},
  {group:"الرسوم والاستثنائي",name:"غير مصنف مؤقتًا",kind:"oneoff",desc:"استخدمه فقط إذا لم تعرف التصنيف، ثم أعد التصنيف لاحقًا.",examples:"عملية تحتاج مراجعة",keywords:[]}
];

var LEGACY_CATEGORY_MAP = {
  "نقل ووقود":"وقود",
  "فواتير (كهرباء/ماء/اتصالات)":"كهرباء",
  "فواتير ومرافق المنزل":"كهرباء",
  "جهات حكومية/مخالفات":"مخالفات مرورية",
  "رسوم حكومية ومخالفات":"مخالفات مرورية",
  "التزامات/سلف قديمة":"سداد ديون أو سلف قديمة",
  "بقالة وتطبيقات (رصيد موبايلي باي)":"تموين وبقالة أساسية",
  "تموين وبقالة":"تموين وبقالة أساسية",
  "تحويلات عائلية":"دعم عائلي دوري",
  "دعم وتحويلات عائلية دورية":"دعم عائلي دوري",
  "بقالة":"تموين وبقالة أساسية",
  "خضار وفواكه":"خضار وفواكه",
  "عامل نظافة/عمالة منزلية":"عامل أو عاملة منزلية",
  "عمالة وخدمات منزلية":"عامل أو عاملة منزلية",
  "مصروف مدرسة/أبناء":"مصروف المدرسة اليومي",
  "تعليم ومصروف الأبناء":"مصروف المدرسة اليومي",
  "مطاعم ووجبات":"مطاعم عائلية",
  "مطاعم ومقاهي":"مطاعم عائلية",
  "دواء وصيدلية":"صيدلية وأدوية",
  "صحة وصيدلية":"صيدلية وأدوية",
  "تأمين ومركبات":"تأمين وفحص وتجديد",
  "مركبات — صيانة وتأمين":"تأمين وفحص وتجديد",
  "مساهمات العمل (قطة)":"مساهمات وقطة",
  "تحويلات وهدايا غير دورية":"هدايا ومناسبات",
  "أخرى":"مشتريات اختيارية",
  "ترفيه وعناية شخصية":"مشتريات اختيارية",
  "ملابس ومشتريات شخصية":"ملابس وأحذية شخصية",
  "أقساط وتمويلات":"قسط تمويل شخصي",
  "اتصالات واشتراكات":"جوال واتصالات",
  "طوارئ وغير مصنف":"غير مصنف مؤقتًا"
};

var SEED_OPENING = {};

var VEHICLES=[{id:"dodge",name:"دودج"},{id:"highlander",name:"هايلاندر"}];
var PROPERTIES=[{id:"my_home",name:"بيتي"},{id:"mother_home",name:"بيت أمي"},{id:"father_building",name:"عمارة أبوي"}];
var ELECTRIC_METERS=[
  {id:"my_home_1",property:"my_home",name:"عداد بيتي 1"},
  {id:"my_home_2",property:"my_home",name:"عداد بيتي 2"},
  {id:"mother_home_1",property:"mother_home",name:"عداد بيت أمي"}
];
var DETAIL_PRESETS={
  "سناكات وحلويات الأبناء":["آيسكريم","عصير","بسكويت","حلاوة","تشيبس"],
  "تموين وبقالة أساسية":["تموين","بقالة","خبز","حليب","مياه"],
  "خضار وفواكه":["خضار","فواكه"],
  "وقود":["بنزين"],
  "مطاعم عائلية":["عشاء","غداء","فطور"],
  "كهرباء":["فاتورة كهرباء"],
  "مياه صهريج/تريلة":["تريلة موية"],
  "مصروف بيت أمي":["مصروف بيت أمي"],
  "عامل أو عاملة منزلية":["عامل النظافة"],
  "مصروف المدرسة اليومي":["مصروف المدرسة"],
  "مخالفات مرورية":["مخالفة مرورية"]
};
var DEFAULT_CONFIG={budget:10000,cycleDays:30,cycleStart:"",savingsTarget:0};
var categories=[],categoryIndex=Object.create(null),expenses=[],history=[],config=Object.assign({},DEFAULT_CONFIG),backupMeta=null;
var currentView="home",pendingDelete=null,undoTimer=null,showUnsyncedOnly=false,suggestedName=null,editingId=null,pendingCandidate=null,addBusy=false,safeMode=false,backupFreshnessSeq=0;

function $(id){return document.getElementById(id)}
function resetSelect(select,label){select.replaceChildren();var o=document.createElement("option");o.value="";o.textContent=label;select.appendChild(o)}
function uid(){return Core.uid()}
function pad(n){return String(n).padStart(2,"0")}
function todayISO(){var d=new Date();return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())}
function pdate(s){var a=String(s||"").split("-").map(Number);return {y:a[0]||1970,m:(a[1]||1)-1,d:a[2]||1}}
function serial(s){var p=pdate(s);return Date.UTC(p.y,p.m,p.d)/86400000}
function daysDiff(a,b){return Math.round(serial(b)-serial(a))}
function addDays(s,n){var p=pdate(s),d=new Date(Date.UTC(p.y,p.m,p.d+n));return d.getUTCFullYear()+"-"+pad(d.getUTCMonth()+1)+"-"+pad(d.getUTCDate())}
function displayDate(s){var p=pdate(s);try{return new Intl.DateTimeFormat("ar-SA",{day:"numeric",month:"short"}).format(new Date(p.y,p.m,p.d,12))}catch(e){return s}}
function fmt(n){return Math.round(Number(n)||0).toLocaleString("en-US")}
function money(n){return fmt(n)+" ر.س"}
function normalize(s){return String(s||"").toLowerCase().replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي").replace(/[ًٌٍَُِّْـ]/g,"").trim()}
function kindLabel(k){return k==="fixed"?"ثابت":(k==="oneoff"?"استثنائي":"متغيّر")}
function kindColor(k){return k==="fixed"?"var(--gold)":(k==="oneoff"?"var(--red)":"var(--teal)")}
function rebuildCategoryIndex(){categoryIndex=Object.create(null);categories.forEach(function(c){categoryIndex[c.name]=c})}
function catInfo(name){return categoryIndex[name]||{group:"غير مصنف",name:name,kind:"oneoff",desc:"فئة غير معرفة",examples:"",keywords:[]}}
function catKind(name){return catInfo(name).kind}
function catGroup(name){return catInfo(name).group||"غير مصنف"}
function vehicleName(id){var x=VEHICLES.find(function(v){return v.id===id});return x?x.name:""}
function propertyName(id){var x=PROPERTIES.find(function(v){return v.id===id});return x?x.name:""}
function meterName(id){var x=ELECTRIC_METERS.find(function(v){return v.id===id});return x?x.name:""}
function isVehicleCategory(name){return catGroup(name)==="المركبات والتنقل"}
function isPropertyCategory(name){return ["كهرباء","مياه شبكة","مياه صهريج/تريلة","نظافة عقار/عمارة","صيانة وإصلاح عقار","مستلزمات العقار","مصروف بيت أمي"].indexOf(name)!==-1}
function needsMeter(name){return name==="كهرباء"}
function safeText(v,max){return Core.safeText(v,max)}
function isValidISODate(s){return Core.isValidISODate(s)}
function writable(){if(!safeMode)return true;showToast("FuelMind في وضع الأمان للقراءة فقط. لا يمكن تعديل البيانات حتى معالجة سجل الحماية.",false);return false}
function enterSafeMode(message){safeMode=true;setSave("وضع أمان — قراءة فقط",false);var b=document.createElement("div");b.id="safe-mode-banner";b.setAttribute("role","alert");b.style.cssText="position:sticky;top:0;z-index:99;margin:0 auto 8px;max-width:720px;padding:10px 12px;border:1px solid rgba(235,107,89,.55);border-radius:10px;background:#2b1518;color:#f6f3ec;font-size:10px;line-height:1.6";b.textContent="وضع الأمان: "+message+" — التعديل والاستعادة والدورة الجديدة موقوفة، بينما العرض والتصدير والفحص متاحة.";var m=document.querySelector("main")||document.body;m.insertBefore(b,m.firstChild)}

var Store={
  prefix:"expense-fuel-pro:",
  backend:"uninitialized",
  async init(){
    try{localStorage.getItem(this.prefix+"__probe__");this.backend="local";return true}catch(e){}
    if(window.storage&&typeof window.storage.get==="function"&&typeof window.storage.set==="function"&&typeof window.storage.delete==="function"){this.backend="embedded";return true}
    this.backend="unavailable";return false
  },
  async get(k){
    if(this.backend==="local"){try{setSave("محفوظ على الجهاز",true);return localStorage.getItem(this.prefix+k)}catch(e){setSave("تعذر قراءة التخزين",false);return null}}
    if(this.backend==="embedded"){try{var r=await window.storage.get(k,false);setSave("تخزين مدمج",true);return r?r.value:null}catch(e){setSave("تعذر قراءة التخزين",false);return null}}
    setSave("التخزين غير متاح",false);return null
  },
  async set(k,v){
    if(this.backend==="local"){try{localStorage.setItem(this.prefix+k,v);setSave("تم الحفظ",true);return true}catch(e){setSave("تعذر الحفظ",false);return false}}
    if(this.backend==="embedded"){try{await window.storage.set(k,v,false);setSave("تم الحفظ",true);return true}catch(e){setSave("تعذر الحفظ",false);return false}}
    setSave("التخزين غير متاح",false);return false
  },
  async remove(k){
    if(this.backend==="local"){try{localStorage.removeItem(this.prefix+k);return true}catch(e){return false}}
    if(this.backend==="embedded"){try{await window.storage.delete(k,false);return true}catch(e){return false}}
    return false
  }
};
function setSave(text,ok){var e=$("save-state");if(!e)return;e.textContent=text;e.classList.toggle("ok",!!ok)}
async function verifiedSet(k,v){
  if(!(await Store.set(k,v)))return false;
  var back=await Store.get(k);return back===v;
}
async function saveAll(){
  var a=await verifiedSet("expenses",JSON.stringify(expenses));
  var b=await verifiedSet("categories",JSON.stringify(categories));
  var c=await verifiedSet("cycle-config",JSON.stringify(config));
  var d=await verifiedSet("cycle-history",JSON.stringify(history));
  return a&&b&&c&&d;
}
async function saveExpenses(){return verifiedSet("expenses",JSON.stringify(expenses))}
async function saveConfig(){return verifiedSet("cycle-config",JSON.stringify(config))}
async function saveHistory(){return verifiedSet("cycle-history",JSON.stringify(history))}
function parse(raw,fallback){try{return raw?JSON.parse(raw):fallback}catch(e){return fallback}}

var CORE_KEYS=["expenses","categories","cycle-config","cycle-history"];
function cloneJSON(v){return JSON.parse(JSON.stringify(v))}
function coreState(){return{expenses:cloneJSON(expenses),categories:cloneJSON(categories),config:cloneJSON(config),history:cloneJSON(history)}}
function stateToRaw(st){return{
  "expenses":JSON.stringify(st.expenses||[]),
  "categories":JSON.stringify(st.categories||[]),
  "cycle-config":JSON.stringify(st.config||{}),
  "cycle-history":JSON.stringify(st.history||[])
}}
async function readCoreRaw(){var out={};for(var i=0;i<CORE_KEYS.length;i++)out[CORE_KEYS[i]]=await Store.get(CORE_KEYS[i]);return out}
function rawEqual(a,b){return CORE_KEYS.every(function(k){return (a[k]===null?null:a[k])===(b[k]===null?null:b[k])})}
async function writeCoreRaw(raw){
  for(var i=0;i<CORE_KEYS.length;i++){
    var k=CORE_KEYS[i],v=raw[k],ok;
    if(v===null||typeof v==="undefined"){ok=await Store.remove(k);if(ok){var gone=await Store.get(k);ok=gone===null}}
    else ok=await verifiedSet(k,v);
    if(!ok)return false;
  }
  return rawEqual(await readCoreRaw(),raw);
}
async function clearTransactionJournal(){var ok=await Store.remove("transaction-journal");if(!ok)return false;return (await Store.get("transaction-journal"))===null}
async function transactionalCommit(nextState,label){
  var before=await readCoreRaw(),after=stateToRaw(nextState);
  var journal={version:2,label:label||"عملية موحدة",createdAt:new Date().toISOString(),phase:"prepared",before:before,after:after};journal.checksum=await sha256(JSON.stringify({version:journal.version,label:journal.label,createdAt:journal.createdAt,phase:journal.phase,before:journal.before,after:journal.after}));
  if(!journal.checksum)throw new Error("تعذر تشغيل SHA-256 اللازم لسجل الحماية");
  if(!(await verifiedSet("transaction-journal",JSON.stringify(journal))))throw new Error("تعذر إنشاء سجل الحماية قبل العملية");
  try{
    if(!(await writeCoreRaw(after)))throw new Error("تعذر إكمال الحفظ الموحد");
    if(!rawEqual(await readCoreRaw(),after))throw new Error("فشل التحقق من الحفظ الموحد");
    journal.phase="committed";journal.committedAt=new Date().toISOString();journal.checksum=await sha256(JSON.stringify({version:journal.version,label:journal.label,createdAt:journal.createdAt,phase:journal.phase,before:journal.before,after:journal.after}));
    if(!(await verifiedSet("transaction-journal",JSON.stringify(journal))))throw new Error("تعذر تثبيت commit العملية");
    if(!(await clearTransactionJournal()))throw new Error("اكتمل commit لكن تعذر تنظيف سجل الحماية");
    return true;
  }catch(err){
    var rolled=await writeCoreRaw(before);
    if(rolled)await clearTransactionJournal();
    if(!rolled)throw new Error("فشلت العملية وفشل rollback الآمن. لا تغلق التطبيق وراجع نقطة الأمان.");
    throw new Error((err&&err.message?err.message:"فشلت العملية")+" — تم تنفيذ rollback واستعادة الحالة السابقة.");
  }
}
function validRawState(raw){return !!raw&&typeof raw==="object"&&CORE_KEYS.every(function(k){return raw[k]===null||typeof raw[k]==="string"})}
async function recoverInterruptedTransaction(){
  var rawJournal=await Store.get("transaction-journal");if(rawJournal===null)return null;
  var j;try{j=JSON.parse(rawJournal)}catch(e){throw new Error("سجل الحماية موجود لكنه غير قابل للقراءة؛ أُوقف التعديل لمنع اعتماد حالة جزئية")};
  if(!j||j.version!==2||!validRawState(j.before)||!validRawState(j.after)||["prepared","committed"].indexOf(j.phase)===-1)throw new Error("سجل الحماية غير صالح أو بإصدار غير موثوق؛ أُوقف التعديل لمنع فقد البيانات");
  if(!/^[a-f0-9]{64}$/i.test(String(j.checksum||"")))throw new Error("سجل الحماية بلا بصمة SHA-256 صالحة؛ أُوقف التعديل");
  var expected=await sha256(JSON.stringify({version:j.version,label:j.label,createdAt:j.createdAt,phase:j.phase,before:j.before,after:j.after}));
  if(!expected||expected!==j.checksum)throw new Error("فشل فحص بصمة سجل الحماية؛ أُوقف التعديل لمنع اعتماد حالة غير موثوقة");
  var now=await readCoreRaw();
  if(j.phase==="committed"&&rawEqual(now,j.after)){if(!(await clearTransactionJournal()))throw new Error("تم تأكيد commit السابق لكن تعذر تنظيف سجل الحماية");return{completed:true,label:safeText(j.label||"عملية سابقة",120)}}
  if(!(await writeCoreRaw(j.before)))throw new Error("تعذر استرجاع عملية غير مكتملة عند بدء التطبيق");
  if(!(await clearTransactionJournal()))throw new Error("تمت استعادة الحالة السابقة لكن تعذر تنظيف سجل الحماية؛ سيبقى التطبيق في وضع الأمان");
  return{rolledBack:true,label:safeText(j.label||"عملية سابقة",120)};
}
function applyStateToMemory(st){config=cloneJSON(st.config);categories=cloneJSON(st.categories);rebuildCategoryIndex();expenses=cloneJSON(st.expenses);history=cloneJSON(st.history)}

function snapshotPayload(reason){var now=new Date().toISOString();return{product:"FuelMind",version:"1.5",schema:3,reason:reason||"نقطة أمان",createdAt:now,exportedAt:now,config:cloneJSON(config),categories:cloneJSON(categories),expenses:cloneJSON(expenses),history:cloneJSON(history)}}
async function createRecoveryPoint(reason){if(!writable())throw new Error("وضع الأمان للقراءة فقط");var p=snapshotPayload(reason),core={product:p.product,version:p.version,schema:p.schema,exportedAt:p.exportedAt,config:p.config,categories:p.categories,expenses:p.expenses,history:p.history},h=await sha256(JSON.stringify(core));if(!h)throw new Error("تعذر إنشاء بصمة SHA-256 لنقطة الأمان");p.integrity={algorithm:"SHA-256",hash:h,records:p.expenses.length};if(!(await verifiedSet("recovery-point",JSON.stringify(p))))throw new Error("تعذر إنشاء نقطة الأمان");renderRecoveryStatus(p);return p}
function renderRecoveryStatus(p){var e=$("recovery-status");if(!e)return;if(!p){e.textContent="لم يتم إنشاء نقطة أمان يدوية بعد.";return}var d=new Date(p.createdAt);e.textContent="آخر نقطة أمان: "+(p.reason||"محفوظة")+" · "+d.toLocaleString("ar-SA")+" · "+((p.expenses||[]).length)+" عملية"}
async function loadRecoveryPoint(){return parse(await Store.get("recovery-point"),null)}
async function restoreRecoveryPoint(){try{var p=await loadRecoveryPoint();if(!p){showToast("لا توجد نقطة أمان محفوظة",false);return}if(!confirm("استعادة آخر نقطة أمان؟ سيتم استبدال الحالة الحالية مع rollback تلقائي إذا فشل الحفظ."))return;await applyRestorePayload(p,"نقطة الأمان");renderRecoveryStatus(p)}catch(e){showToast("تعذر استعادة نقطة الأمان: "+(e&&e.message?e.message:"خطأ غير معروف"),false)}}

function sanitizeCategory(c,base){c=c&&typeof c==="object"?c:{};base=base||{};var name=safeText(c.name||base.name,80),kind=["fixed","oneoff","flex"].indexOf(c.kind)>-1?c.kind:(base.kind||"oneoff"),kw=Array.isArray(c.keywords)?c.keywords:(base.keywords||[]);return{group:safeText(c.group||base.group||"غير مصنف",80),name:name,kind:kind,desc:safeText(c.desc||base.desc,240),examples:safeText(c.examples||base.examples,240),keywords:kw.slice(0,40).map(function(x){return safeText(x,80)}).filter(Boolean)}}
function mergeCategories(saved){
  var defaults=Object.create(null);DEFAULT_CATEGORIES.forEach(function(c){defaults[c.name]=c});
  var out=[],seen=Object.create(null);
  if(Array.isArray(saved)){
    saved.slice(0,200).forEach(function(c){
      if(!c||typeof c!=="object")return;var rawName=safeText(c.name,80);if(!rawName||seen[rawName])return;
      var clean=sanitizeCategory(c,defaults[rawName]||{});if(!clean.name)return;out.push(clean);seen[clean.name]=1;
    });
  }
  DEFAULT_CATEGORIES.forEach(function(c){if(!seen[c.name])out.push(sanitizeCategory(c,c))});
  return out;
}
function migrate(){
  var changed=false;
  expenses.forEach(function(e){
    var mapped=LEGACY_CATEGORY_MAP[e.category];if(mapped&&mapped!==e.category){e.category=mapped;changed=true}
    if(isVehicleCategory(e.category)&&!e.vehicle){var v=inferVehicle(e.desc||"");if(v){e.vehicle=v;changed=true}}
    if(isPropertyCategory(e.category)&&!e.property){var p=inferProperty(e.desc||"");if(p){e.property=p;changed=true}}
    if(e.category==="كهرباء"&&!e.meter){var m=inferMeter(e.desc||"");if(m){e.meter=m;var mo=ELECTRIC_METERS.find(function(x){return x.id===m});if(mo)e.property=mo.property;changed=true}}
  });
  return changed;
}
async function load(){
  var rawCats=await Store.get("categories"),rawExpenses=await Store.get("expenses"),rawConfig=await Store.get("cycle-config"),rawHistory=await Store.get("cycle-history");
  if(rawCats===null)categories=mergeCategories(null);else{var parsedCats;try{parsedCats=JSON.parse(rawCats)}catch(e){throw new Error("دليل التصنيفات المحلي غير قابل للقراءة")};if(!Array.isArray(parsedCats))throw new Error("دليل التصنيفات المحلي ليس قائمة صالحة");categories=mergeCategories(parsedCats)}
  rebuildCategoryIndex();
  if(rawExpenses===null)expenses=[];else{var parsedExpenses;try{parsedExpenses=JSON.parse(rawExpenses)}catch(e){throw new Error("بيانات المصروفات المحلية غير قابلة للقراءة")};expenses=sanitizeExpenseArray(parsedExpenses,"بيانات الجهاز")}
  if(rawConfig===null){config=Object.assign({},DEFAULT_CONFIG,{cycleStart:todayISO()})}else{var parsedConfig;try{parsedConfig=JSON.parse(rawConfig)}catch(e){throw new Error("إعدادات الدورة المحلية غير قابلة للقراءة")};config=sanitizeConfig(parsedConfig)}
  if(rawHistory===null)history=[];else{var parsedHistory;try{parsedHistory=JSON.parse(rawHistory)}catch(e){throw new Error("أرشيف الدورات المحلي غير قابل للقراءة")};history=sanitizeHistory(parsedHistory)}
  backupMeta=parse(await Store.get("backup-meta"),null);
  if(!safeMode&&migrate())await saveExpenses();
  if(!safeMode)await verifiedSet("categories",JSON.stringify(categories));
  syncSettings();
}

function groupList(){var seen={},arr=[];categories.forEach(function(c){if(!seen[c.group]){seen[c.group]=1;arr.push(c.group)}});return arr}
function inferVehicle(text){var q=normalize(text);if(q.indexOf("دودج")>-1||q.indexOf("تشارجر")>-1)return"dodge";if(q.indexOf("هايلاندر")>-1||q.indexOf("هاي لاندر")>-1)return"highlander";return""}
function inferProperty(text){var q=normalize(text);if(q.indexOf("بيت امي")>-1||q.indexOf("الوالده")>-1)return"mother_home";if(q.indexOf("عماره ابوي")>-1||q.indexOf("عماره الوالد")>-1)return"father_building";if(q.indexOf("بيتي")>-1)return"my_home";return""}
function inferMeter(text){var q=normalize(text);if(q.indexOf("عداد بيتي 1")>-1||q.indexOf("العداد الاول")>-1)return"my_home_1";if(q.indexOf("عداد بيتي 2")>-1||q.indexOf("العداد الثاني")>-1)return"my_home_2";if(q.indexOf("عداد بيت امي")>-1||q.indexOf("عداد امي")>-1)return"mother_home_1";return""}
function suggestCategory(text){
  var q=normalize(text);if(q.length<2)return null;var best=null,scoreBest=0;
  categories.forEach(function(c){
    var score=0;(c.keywords||[]).forEach(function(k){var nk=normalize(k);if(nk&&q.indexOf(nk)>-1)score+=Math.max(2,nk.length/2)});
    if((q.indexOf("للابناء")>-1||q.indexOf("للاولاد")>-1||q.indexOf("للاطفال")>-1)&&c.group==="الأبناء")score+=3;
    if(score>scoreBest){scoreBest=score;best=c}
  });
  return scoreBest>=2?best:null;
}

function cycleState(){var raw=daysDiff(config.cycleStart,todayISO())+1,elapsed=Math.min(config.cycleDays,Math.max(0,raw));return{raw:raw,elapsed:elapsed,rateDays:Math.max(1,elapsed),remaining:Math.max(config.cycleDays-elapsed,0)}}
function totals(){
  var byCat={},total=0,fixed=0,variable=0,oneoff=0,varEx=[];
  expenses.forEach(function(e){var a=Number(e.amount)||0;total+=a;byCat[e.category]=(byCat[e.category]||0)+a;var k=catKind(e.category);if(k==="fixed")fixed+=a;else if(k==="flex"){variable+=a;varEx.push(e)}else oneoff+=a});
  return{byCat:byCat,total:total,fixed:fixed,variable:variable,oneoff:oneoff,varEx:varEx}
}
function assetTotals(){
  var vehicles={dodge:0,highlander:0,unassigned:0},props={my_home:0,mother_home:0,father_building:0,unassigned:0},meters={my_home_1:0,my_home_2:0,mother_home_1:0,unassigned:0};
  expenses.forEach(function(e){var a=Number(e.amount)||0;if(isVehicleCategory(e.category)){if(e.vehicle&&vehicles.hasOwnProperty(e.vehicle))vehicles[e.vehicle]+=a;else vehicles.unassigned+=a}if(isPropertyCategory(e.category)){if(e.property&&props.hasOwnProperty(e.property))props[e.property]+=a;else props.unassigned+=a}if(e.category==="كهرباء"){if(e.meter&&meters.hasOwnProperty(e.meter))meters[e.meter]+=a;else meters.unassigned+=a}});
  return{vehicles:vehicles,props:props,meters:meters}
}
function topForAsset(type,id){var by={};expenses.forEach(function(e){var match=type==="vehicle"?e.vehicle===id:e.property===id;if(!match)return;by[e.category]=(by[e.category]||0)+Number(e.amount||0)});var best=null;Object.keys(by).forEach(function(k){if(!best||by[k]>best.val)best={name:k,val:by[k]}});return best}
function between(start,end){var a=serial(start),b=serial(end);return expenses.reduce(function(s,e){var d=serial(e.date);return s+(d>=a&&d<=b?Number(e.amount||0):0)},0)}
function recent(startBack,endBack){return between(addDays(todayISO(),-startBack),addDays(todayISO(),-endBack))}
function health(t,st,projected,goalSafe,daily,weekNow,weekPrev){
  var score=100,r=projected/Math.max(config.budget,1);if(r>1)score-=Math.min(42,(r-1)*120+18);else if(r>.92)score-=10;
  if(config.savingsTarget>0&&st.remaining>0&&goalSafe>0&&daily>goalSafe)score-=Math.min(20,(daily/goalSafe-1)*30);
  if(weekPrev>0&&weekNow>weekPrev)score-=Math.min(14,(weekNow/weekPrev-1)*18);if(t.total>config.budget)score-=12;return Math.max(0,Math.min(100,Math.round(score)))
}

function smartAlerts(t,st,daily,safe,projected,goalSafe,weekNow,weekPrev){
  var a=[];
  if(projected>config.budget)a.push({kind:"bad",icon:"!",title:"تجاوز متوقع",copy:"إذا استمر المعدل الحالي فالتجاوز يقارب "+money(projected-config.budget)+". اجعل متوسط الصرف الجديد قريبًا من "+money(safe)+" يوميًا."});
  else if(projected>config.budget*.92)a.push({kind:"warn",icon:"≈",title:"هامش الأمان ضيق",copy:"أنت قريب من سقف الميزانية؛ أي قفزة كبيرة قد تنقل الدورة إلى التجاوز."});
  else a.push({kind:"good",icon:"✓",title:"المسار العام منضبط",copy:"التوقع الحالي أقل من الميزانية، مع هامش يسمح بامتصاص بعض المصروفات غير المتوقعة."});
  if(config.savingsTarget>0&&st.remaining>0){
    if(goalSafe<=0)a.push({kind:"bad",icon:"↓",title:"هدف التوفير تحت الضغط",copy:"المصروف المسجل تجاوز سقف الصرف الذي يحقق هدف التوفير الحالي."});
    else if(daily>goalSafe*1.08)a.push({kind:"warn",icon:"↘",title:"خفّض الحرق لتحقيق هدف التوفير",copy:"المعدل المتغيّر "+money(daily)+" يوميًا، والمستوى الأقرب لهدفك "+money(goalSafe)+"."});
    else a.push({kind:"good",icon:"★",title:"هدف التوفير قابل للتحقيق",copy:"حافظ على متوسط قريب من "+money(goalSafe)+" يوميًا حتى نهاية الدورة."});
  }
  var flexCats=Object.keys(t.byCat).filter(function(n){return catKind(n)==="flex"}).map(function(n){return{name:n,val:t.byCat[n]}}).sort(function(x,y){return y.val-x.val});
  if(flexCats[0]&&t.variable>0&&flexCats[0].val/t.variable>.34)a.push({kind:"warn",icon:"%",title:"أعلى ضغط: "+flexCats[0].name,copy:"يمثل نحو "+Math.round(flexCats[0].val/t.variable*100)+"% من المصروف المتغيّر؛ مراجعته تعطي أكبر أثر سريع."});
  if(weekPrev>0&&weekNow>weekPrev*1.25)a.push({kind:"bad",icon:"↑",title:"قفزة أسبوعية",copy:"آخر 7 أيام أعلى بنحو "+Math.round((weekNow/weekPrev-1)*100)+"% من الأيام السبعة السابقة."});
  return a;
}

function render(){
  var t=totals(),st=cycleState(),assets=assetTotals(),daily=t.variable/st.rateDays,remaining=config.budget-t.total,safe=st.remaining?Math.max(remaining/st.remaining,0):0,projected=t.total+daily*st.remaining;
  var spendGoal=Math.max(config.budget-config.savingsTarget,0),goalSafe=st.remaining?Math.max((spendGoal-t.total)/st.remaining,0):0;
  var weekNow=recent(6,0),weekPrev=recent(13,7),score=health(t,st,projected,goalSafe,daily,weekNow,weekPrev),pct=projected/config.budget*100;
  renderHome(t,st,assets,daily,remaining,safe,projected,goalSafe,weekNow,weekPrev,pct);
  renderTransactions();renderAnalytics(t,st,assets,daily,projected,goalSafe,weekNow,weekPrev,score);renderGuide();
  $("unsynced-count").textContent=expenses.filter(function(e){return e.synced===false}).length+" عملية";
  $("category-count").textContent=categories.length+" بند";
  $("history-count").textContent=history.length+" مؤرشفة";
  renderBackupFreshness();
}
function renderHome(t,st,a,daily,remaining,safe,projected,goalSafe,weekNow,weekPrev,pct){
  var end=addDays(config.cycleStart,config.cycleDays-1);$("cycle-range").textContent=displayDate(config.cycleStart)+" — "+displayDate(end);$("cycle-progress").style.width=Math.min(100,st.elapsed/config.cycleDays*100)+"%";$("cycle-day").textContent="اليوم "+st.elapsed+" من "+config.cycleDays;$("cycle-left").textContent=st.remaining+" يوم متبقٍ";
  var color=pct<=90?"var(--teal)":(pct<=100?"var(--gold)":"var(--red)");$("main-ring").style.setProperty("--ring",Math.min(360,pct/120*360)+"deg");$("main-ring").style.background="conic-gradient("+color+" 0deg,"+color+" "+Math.min(360,pct/120*360)+"deg,rgba(255,255,255,.06) "+Math.min(360,pct/120*360)+"deg)";$("main-pct").textContent=Math.round(pct)+"%";$("main-pct").style.color=color;
  $("home-spent").textContent=money(t.total);$("home-remaining").textContent=money(Math.max(remaining,0));$("home-safe").textContent=st.remaining?money(safe):"—";$("home-goal-safe").textContent=st.remaining?money(goalSafe):"—";
  if(pct>100){$("main-status-title").textContent="تحتاج تصحيح المسار";$("main-status-copy").textContent="التوقع الحالي أعلى من ميزانية الدورة بناءً على المصروف المسجل.";$("main-status-chip").textContent="تجاوز متوقع";$("main-status-chip").className="status bad"}
  else if(pct>90){$("main-status-title").textContent="قريب من الحد";$("main-status-copy").textContent="الوضع قابل للسيطرة، لكن هامش المناورة أصبح محدودًا.";$("main-status-chip").textContent="راقب الصرف";$("main-status-chip").className="status warn"}
  else{$("main-status-title").textContent="المسار مطمئن";$("main-status-copy").textContent="التوقع الحالي داخل الميزانية، واستمرار الانضباط يحافظ على هدفك.";$("main-status-chip").textContent="ضمن المسار";$("main-status-chip").className="status good"}
  var alerts=smartAlerts(t,st,daily,safe,projected,goalSafe,weekNow,weekPrev),host=$("home-alerts");host.replaceChildren();alerts.slice(0,3).forEach(function(x){var d=document.createElement("div");d.className="smart "+x.kind;var i=document.createElement("div");i.className="ico";i.textContent=x.icon;var b=document.createElement("div"),s=document.createElement("strong"),p=document.createElement("p");s.textContent=x.title;p.textContent=x.copy;b.append(s,p);d.append(i,b);host.appendChild(d)});
  $("home-dodge").textContent=money(a.vehicles.dodge);$("home-highlander").textContent=money(a.vehicles.highlander);$("home-mother").textContent=money(a.props.mother_home);$("home-father").textContent=money(a.props.father_building);
  renderQuickCats();
}
function renderQuickCats(){
  var names=["وقود","تموين وبقالة أساسية","خضار وفواكه","سناكات وحلويات الأبناء","مطاعم عائلية"],host=$("quick-cats");host.replaceChildren();
  names.forEach(function(n){var c=catInfo(n),b=document.createElement("button");b.className="quickcat";b.type="button";b.replaceChildren();var strong=document.createElement("span");strong.textContent=n;var small=document.createElement("small");small.textContent=c.group;b.append(strong,small);b.addEventListener("click",function(){go("add");$("f-category").value=n;updateDynamicFields();setTimeout(function(){$("f-amount").focus()},100)});host.appendChild(b)})
}
function renderTransactions(){
  var q=normalize($("tx-search").value),arr=expenses.slice().sort(function(a,b){return b.date.localeCompare(a.date)}).filter(function(e){if(showUnsyncedOnly&&e.synced!==false)return false;var hay=normalize([e.desc,e.note,e.category,catGroup(e.category),vehicleName(e.vehicle),propertyName(e.property),meterName(e.meter)].join(" "));return !q||hay.indexOf(q)>-1});
  $("tx-count").textContent=arr.length+" عملية";var host=$("tx-list");host.replaceChildren();if(!arr.length){host.textContent="لا توجد عمليات مطابقة.";host.style.color="var(--muted)";host.style.fontSize="10px";return}
  host.style.color="";host.style.fontSize="";
  arr.slice(0,40).forEach(function(e){var row=document.createElement("div");row.className="tx";var icon=document.createElement("div");icon.className="txicon";icon.textContent=e.vehicle?"🚗":(e.property?"⌂":"•");var main=document.createElement("div");main.className="txmain";var st=document.createElement("strong");st.textContent=e.desc;var meta=document.createElement("span");var bits=[e.date,catGroup(e.category)+" ← "+e.category];if(e.vehicle)bits.push(vehicleName(e.vehicle));if(e.property)bits.push(propertyName(e.property));if(e.meter)bits.push(meterName(e.meter));if(e.synced===false)bits.push("لم تُرسل");meta.textContent=bits.join(" · ");main.append(st,meta);var amt=document.createElement("div");amt.className="txamt";amt.textContent=money(e.amount);var actions=document.createElement("div");actions.className="tx-actions";
    var edit=document.createElement("button");edit.className="edit";edit.type="button";edit.textContent="✎";edit.setAttribute("aria-label","تعديل العملية");edit.addEventListener("click",function(){openEdit(e.id)});
    var del=document.createElement("button");del.className="del";del.type="button";del.textContent="×";del.setAttribute("aria-label","حذف العملية");del.addEventListener("click",function(){removeExpense(e.id)});
    actions.append(edit,del);row.append(icon,main,amt,actions);host.appendChild(row)})
}
function renderAnalytics(t,st,a,daily,projected,goalSafe,weekNow,weekPrev,score){
  $("health-score").textContent=score+"/100";$("health-score").className="value "+(score>=80?"good":(score>=60?"warn":"bad"));$("projected-total").textContent=money(projected);$("projected-total").className="value "+(projected<=config.budget?"good":"bad");$("fixed-total").textContent=money(t.fixed);$("oneoff-total").textContent=money(t.oneoff);
  if(weekPrev>0){var w=Math.round((weekNow/weekPrev-1)*100);$("week-compare").textContent=(w>0?"+":"")+w+"% عن الأسبوع السابق";$("week-compare").className=w>15?"bad":(w<-10?"good":"warn")}else $("week-compare").textContent="بيانات غير كافية";
  renderWeek();renderTrend(t.varEx,st,Math.max(config.budget-t.fixed,0));renderBreakdown(t.byCat);
  $("dodge-total").textContent=money(a.vehicles.dodge);$("highlander-total").textContent=money(a.vehicles.highlander);var dt=topForAsset("vehicle","dodge"),ht=topForAsset("vehicle","highlander");$("dodge-desc").textContent=dt?"أعلى بند: "+dt.name+" · "+money(dt.val):"لا توجد مصروفات";$("highlander-desc").textContent=ht?"أعلى بند: "+ht.name+" · "+money(ht.val):"لا توجد مصروفات";
  if(a.vehicles.dodge&&a.vehicles.highlander){var d=Math.abs(a.vehicles.dodge-a.vehicles.highlander);$("vehicle-compare").textContent=a.vehicles.dodge>a.vehicles.highlander?"الدودج أعلى تكلفة بفارق "+money(d):"الهايلاندر أعلى تكلفة بفارق "+money(d)}else $("vehicle-compare").textContent="تكتمل المقارنة عندما توجد مصروفات للمركبتين.";
  $("myhome-total").textContent=money(a.props.my_home);$("mother-total").textContent=money(a.props.mother_home);$("father-total").textContent=money(a.props.father_building);var mp=topForAsset("property","my_home"),mop=topForAsset("property","mother_home"),fp=topForAsset("property","father_building");$("myhome-desc").textContent=mp?"أعلى بند: "+mp.name:"مرافق وصيانة";$("mother-desc").textContent=mop?"أعلى بند: "+mop.name:"مصروف ومرافق";$("father-desc").textContent=fp?"أعلى بند: "+fp.name:"نظافة ومياه وتشغيل";
  $("meter-home-1").textContent=money(a.meters.my_home_1);$("meter-home-2").textContent=money(a.meters.my_home_2);$("meter-mother").textContent=money(a.meters.mother_home_1);$("meter-unassigned").textContent=a.meters.unassigned?"يوجد "+money(a.meters.unassigned)+" كهرباء قديمة غير موزعة على عداد محدد.":"كل مصروفات الكهرباء المسجلة مرتبطة بعداد محدد.";
  if(history.length){var prev=history[history.length-1],diff=projected-Number(prev.total||0);$("cycle-compare").textContent=diff===0?"التوقع الحالي مماثل تقريبًا للدورة السابقة.":(diff<0?"التوقع الحالي أقل من السابقة بـ "+money(Math.abs(diff))+".":"التوقع الحالي أعلى من السابقة بـ "+money(diff)+".")}else $("cycle-compare").textContent="ستظهر المقارنة بعد أرشفة أول دورة.";
}
function renderWeek(){
  var vals=[],dates=[];for(var i=6;i>=0;i--){var d=addDays(todayISO(),-i);dates.push(d);vals.push(between(d,d))}var max=Math.max.apply(null,vals.concat([1])),host=$("week-bars");host.replaceChildren();
  vals.forEach(function(v,i){var c=document.createElement("div");c.className="wcol";var a=document.createElement("div");a.className="wamt";a.textContent=fmt(v);var w=document.createElement("div");w.className="wbarwrap";var b=document.createElement("div");b.className="wbar";b.style.height=Math.max(2,v/max*76)+"px";if(v/max>.78)b.style.background="linear-gradient(180deg,var(--red),rgba(235,107,89,.45))";else if(v/max>.55)b.style.background="linear-gradient(180deg,var(--gold),rgba(221,169,75,.45))";w.appendChild(b);var l=document.createElement("div");l.className="wlab";l.textContent=displayDate(dates[i]);c.append(a,w,l);host.appendChild(c)})
}
function renderTrend(varEx,st,varBudget){
  var svg=$("trend-svg"),W=440,H=150,L=34,R=10,T=10,B=24,PW=W-L-R,PH=H-T-B,by={};
  varEx.forEach(function(e){var o=Math.max(0,Math.min(config.cycleDays-1,daysDiff(config.cycleStart,e.date)));by[o]=(by[o]||0)+Number(e.amount||0)});
  var maxDay=Math.max(0,Math.min(st.elapsed-1,config.cycleDays-1)),cum=0,pts=[[0,0]];
  for(var d=0;d<=maxDay;d++){cum+=(by[d]||0);pts.push([d+1,cum])}
  var ymax=Math.max(cum,varBudget,1)*1.12;
  function x(day){return L+Math.min(Math.max(day,0),config.cycleDays)/config.cycleDays*PW}
  function y(value){return T+PH-value/ymax*PH}
  var ns="http://www.w3.org/2000/svg";
  function svgNode(name,attrs){var el=document.createElementNS(ns,name);Object.keys(attrs).forEach(function(k){el.setAttribute(k,String(attrs[k]))});return el}
  svg.replaceChildren();
  for(var g=0;g<=4;g++){var gy=T+PH/4*g;svg.appendChild(svgNode("line",{x1:L,y1:gy,x2:W-R,y2:gy,stroke:"#263c55","stroke-width":1}))}
  var path=pts.map(function(p,i){return(i?"L":"M")+x(p[0]).toFixed(1)+" "+y(p[1]).toFixed(1)}).join(" ");
  svg.appendChild(svgNode("path",{d:"M "+x(0)+" "+y(0)+" L "+x(config.cycleDays)+" "+y(varBudget),stroke:"#94a6ba","stroke-width":1.4,"stroke-dasharray":"4,4",fill:"none"}));
  svg.appendChild(svgNode("line",{x1:x(st.elapsed),y1:T,x2:x(st.elapsed),y2:H-B,stroke:"#dda94b","stroke-width":1,"stroke-dasharray":"2,3"}));
  svg.appendChild(svgNode("path",{d:path,stroke:"#38b8a7","stroke-width":2.6,fill:"none"}));
  svg.appendChild(svgNode("circle",{cx:x(st.elapsed),cy:y(cum),r:3.5,fill:"#38b8a7"}));
}
function renderBreakdown(byCat){
  var arr=Object.keys(byCat).map(function(n){return{name:n,val:byCat[n],kind:catKind(n)}}).sort(function(a,b){return b.val-a.val}),max=Math.max.apply(null,arr.map(function(x){return x.val}).concat([1])),host=$("category-breakdown");host.replaceChildren();
  arr.slice(0,18).forEach(function(c){var r=document.createElement("div");r.className="brow";var n=document.createElement("div");n.className="bname";n.textContent=c.name;var tr=document.createElement("div");tr.className="btrack";var f=document.createElement("div");f.className="bfill";f.style.width=c.val/max*100+"%";f.style.background=kindColor(c.kind);tr.appendChild(f);var v=document.createElement("div");v.className="bval";v.textContent=fmt(c.val);r.append(n,tr,v);host.appendChild(r)})
}
function renderGuide(){
  var q=normalize($("category-search").value),host=$("category-guide");host.replaceChildren();
  groupList().forEach(function(g){var cats=categories.filter(function(c){if(c.group!==g)return false;if(!q)return true;return normalize([c.name,c.desc,c.examples,(c.keywords||[]).join(" ")].join(" ")).indexOf(q)>-1});if(!cats.length)return;var sec=document.createElement("div");sec.className="guide-group";var h=document.createElement("h3");h.textContent=g;sec.appendChild(h);cats.forEach(function(c){var d=document.createElement("div");d.className="guide";var hd=document.createElement("div");hd.className="guidehead";var st=document.createElement("strong");st.textContent=c.name;var p=document.createElement("span");p.className="pill";p.style.color=kindColor(c.kind);p.textContent=kindLabel(c.kind);hd.append(st,p);var de=document.createElement("div");de.className="guidedesc";de.textContent=c.desc||"";d.append(hd,de);if(c.examples){var ex=document.createElement("div");ex.className="guideex";ex.textContent="أمثلة: "+c.examples;d.appendChild(ex)}sec.appendChild(d)});host.appendChild(sec)})
}

function buildCategorySelect(){
  var s=$("f-category"),prev=s.value;s.replaceChildren();groupList().forEach(function(g){var og=document.createElement("optgroup");og.label=g;categories.filter(function(c){return c.group===g}).forEach(function(c){var o=document.createElement("option");o.value=c.name;o.textContent=c.name;og.appendChild(o)});s.appendChild(og)});if(prev&&categories.some(function(c){return c.name===prev}))s.value=prev
}
function fillCategorySelect(selectId,selected){
  var s=$(selectId);s.replaceChildren();
  groupList().forEach(function(g){
    var og=document.createElement("optgroup");og.label=g;
    categories.filter(function(c){return c.group===g}).forEach(function(c){
      var o=document.createElement("option");o.value=c.name;o.textContent=c.name;og.appendChild(o);
    });
    s.appendChild(og);
  });
  if(selected)s.value=selected;
}
function fillPropertySelect(selectId,selected,category){
  var s=$(selectId);resetSelect(s,"اختر العقار");
  PROPERTIES.filter(function(p){return !needsMeter(category)||p.id!=="father_building"}).forEach(function(p){
    var o=document.createElement("option");o.value=p.id;o.textContent=p.name;s.appendChild(o);
  });
  if(category==="مصروف بيت أمي")selected="mother_home";
  if(selected)s.value=selected;
}
function fillMeterSelect(selectId,property,selected){
  var s=$(selectId);resetSelect(s,"اختر العداد");
  ELECTRIC_METERS.filter(function(m){return m.property===property}).forEach(function(m){
    var o=document.createElement("option");o.value=m.id;o.textContent=m.name;s.appendChild(o);
  });
  if(selected)s.value=selected;
}

function setPropertyOptions(){
  var s=$("f-property"),prev=s.value,cat=$("f-category").value;resetSelect(s,"اختر العقار");PROPERTIES.filter(function(p){return !needsMeter(cat)||p.id!=="father_building"}).forEach(function(p){var o=document.createElement("option");o.value=p.id;o.textContent=p.name;s.appendChild(o)});
  if(cat==="مصروف بيت أمي")prev="mother_home";if(prev)s.value=prev;
}
function setMeterOptions(){
  var s=$("f-meter"),prev=s.value,prop=$("f-property").value;resetSelect(s,"اختر العداد");ELECTRIC_METERS.filter(function(m){return m.property===prop}).forEach(function(m){var o=document.createElement("option");o.value=m.id;o.textContent=m.name;s.appendChild(o)});if(prev)s.value=prev
}
function renderDetailChips(){
  var host=$("detail-chips"),cat=$("f-category").value,list=DETAIL_PRESETS[cat]||[];host.replaceChildren();
  $("detail-chips-field").classList.toggle("hidden",!list.length);
  list.forEach(function(label){var b=document.createElement("button");b.type="button";b.className="detail-chip";b.textContent=label;b.addEventListener("click",function(){$("f-desc").value=label;$("f-desc").dispatchEvent(new Event("input",{bubbles:true}));$("f-amount").focus()});host.appendChild(b)});
}
function clearFieldErrors(){["f-amount","f-desc","f-category","f-vehicle","f-property","f-meter","f-date"].forEach(function(id){var e=$(id);if(e)e.removeAttribute("aria-invalid")})}
function markInvalid(id){var e=$(id);if(e)e.setAttribute("aria-invalid","true")}
function duplicateOf(c){
  var nd=normalize(c.desc);return expenses.find(function(e){return e.date===c.date&&Math.round(Number(e.amount)*100)===Math.round(Number(c.amount)*100)&&e.category===c.category&&normalize(e.desc)===nd&&(e.vehicle||"")===(c.vehicle||"")&&(e.property||"")===(c.property||"")&&(e.meter||"")===(c.meter||"")})||null;
}
function showDuplicate(existing,candidate){pendingCandidate=candidate;$("duplicate-copy").textContent="وجدت عملية مطابقة بتاريخ "+existing.date+" بمبلغ "+money(existing.amount)+" ووصف «"+existing.desc+"».";$("duplicate-box").classList.add("show")}
function hideDuplicate(){pendingCandidate=null;$("duplicate-box").classList.remove("show")}
async function persistCandidate(c){
  if(!writable())return;var btn=$("add-expense");if(addBusy)return;addBusy=true;btn.disabled=true;
  try{c.createdAt=c.createdAt||new Date().toISOString();c.updatedAt=new Date().toISOString();expenses.push(c);if(!(await saveExpenses())){expenses.pop();throw new Error("تعذر التحقق من حفظ العملية")};$("f-amount").value="";$("f-desc").value="";$("f-note").value="";$("suggestion").style.display="none";hideDuplicate();render();showToast("تم حفظ المصروف بنجاح",false);setTimeout(function(){$("f-amount").focus()},100)}catch(e){formErr(e.message||"تعذر حفظ المصروف")}
  finally{addBusy=false;btn.disabled=false}
}

function updateDynamicFields(){
  var cat=$("f-category").value,veh=isVehicleCategory(cat),prop=isPropertyCategory(cat),meter=needsMeter(cat);$("vehicle-field").classList.toggle("hidden",!veh);$("property-field").classList.toggle("hidden",!prop);$("meter-field").classList.toggle("hidden",!meter);
  if(!veh)$("f-vehicle").value="";if(prop){setPropertyOptions();if(meter)setMeterOptions()}else{$("f-property").value="";$("f-meter").value=""}
  renderDetailChips();hideDuplicate();
}
function syncSettings(){$("budget").value=config.budget;$("cycle-days").value=config.cycleDays;$("cycle-start").value=config.cycleStart;$("cycle-start").max=todayISO();$("savings-target").value=config.savingsTarget;$("f-date").value=todayISO();$("f-date").max=todayISO();buildCategorySelect();updateDynamicFields()}

async function addExpense(){
  clearFieldErrors();hideDuplicate();var err=$("form-error");err.style.display="none";
  var amount=Number($("f-amount").value),desc=$("f-desc").value.trim().replace(/\s+/g," "),cat=$("f-category").value,date=$("f-date").value||todayISO(),vehicle=isVehicleCategory(cat)?$("f-vehicle").value:"",property=isPropertyCategory(cat)?$("f-property").value:"",meter=needsMeter(cat)?$("f-meter").value:"",note=$("f-note").value.trim().replace(/\s+/g," ");
  if(!isFinite(amount)||amount<=0){markInvalid("f-amount");return formErr("أدخل مبلغًا صحيحًا أكبر من صفر.")}
  if(amount>1000000){markInvalid("f-amount");return formErr("المبلغ أعلى من الحد المنطقي للإدخال. راجعه قبل الحفظ.")}
  if(!desc){markInvalid("f-desc");return formErr("اكتب وصفًا مختصرًا للمصروف.")}
  if(!cat||!categories.some(function(c){return c.name===cat})){markInvalid("f-category");return formErr("اختر تصنيفًا صحيحًا.")}
  if(!isValidISODate(date)||date>todayISO()){markInvalid("f-date");return formErr("اختر تاريخًا صحيحًا غير مستقبلي.")}
  if(isVehicleCategory(cat)&&!vehicle){markInvalid("f-vehicle");return formErr("حدد المركبة: دودج أو هايلاندر.")}
  if(isPropertyCategory(cat)&&!property){markInvalid("f-property");return formErr("حدد العقار أو الجهة.")}
  if(needsMeter(cat)&&!meter){markInvalid("f-meter");return formErr("حدد عداد الكهرباء.")}
  var candidate={id:uid(),date:date,category:cat,vehicle:vehicle,property:property,meter:meter,desc:desc.slice(0,140),note:note.slice(0,80),amount:Math.round(amount*100)/100,synced:false};
  var dupe=duplicateOf(candidate);if(dupe){showDuplicate(dupe,candidate);return}
  await persistCandidate(candidate);
}
function formErr(t){var e=$("form-error");e.textContent=t;e.style.display="block"}

function updateEditDynamic(){
  var cat=$("edit-category").value;
  var veh=isVehicleCategory(cat),prop=isPropertyCategory(cat),meter=needsMeter(cat);
  $("edit-vehicle-field").classList.toggle("hidden",!veh);
  $("edit-property-field").classList.toggle("hidden",!prop);
  $("edit-meter-field").classList.toggle("hidden",!meter);
  if(!veh)$("edit-vehicle").value="";
  if(prop){
    var prev=$("edit-property").value;
    fillPropertySelect("edit-property",prev,cat);
    if(meter)fillMeterSelect("edit-meter",$("edit-property").value,$("edit-meter").value);
  }else{
    $("edit-property").value="";$("edit-meter").value="";
  }
}
function openEdit(id){
  var e=expenses.find(function(x){return x.id===id});if(!e)return;
  editingId=id;
  $("edit-amount").value=e.amount;
  $("edit-date").value=e.date;
  $("edit-desc").value=e.desc||"";
  $("edit-note").value=e.note||"";
  fillCategorySelect("edit-category",e.category);
  $("edit-vehicle").value=e.vehicle||"";
  fillPropertySelect("edit-property",e.property||"",e.category);
  fillMeterSelect("edit-meter",e.property||"",e.meter||"");
  updateEditDynamic();
  $("edit-vehicle").value=e.vehicle||"";
  $("edit-property").value=e.property||"";
  if(needsMeter(e.category)){fillMeterSelect("edit-meter",e.property||"",e.meter||"");}
  $("edit-error").style.display="none";
  $("edit-modal").classList.add("show");
}
async function saveEdit(){
  if(!writable())return;var e=expenses.find(function(x){return x.id===editingId});if(!e)return;
  var amount=Number($("edit-amount").value),date=$("edit-date").value,desc=$("edit-desc").value.trim(),cat=$("edit-category").value;
  var vehicle=isVehicleCategory(cat)?$("edit-vehicle").value:"";
  var property=isPropertyCategory(cat)?$("edit-property").value:"";
  var meter=needsMeter(cat)?$("edit-meter").value:"";
  var err=$("edit-error");
  function fail(t){err.textContent=t;err.style.display="block";return false}
  if(!isFinite(amount)||amount<=0)return fail("أدخل مبلغًا صحيحًا.");
  if(amount>1000000)return fail("المبلغ أعلى من الحد المنطقي للإدخال.");
  if(!desc)return fail("اكتب وصفًا للعملية.");
  if(!cat||!categories.some(function(c){return c.name===cat}))return fail("اختر تصنيفًا صحيحًا.");
  if(!isValidISODate(date)||date>todayISO())return fail("اختر تاريخًا صحيحًا غير مستقبلي.");
  if(isVehicleCategory(cat)&&!vehicle)return fail("حدد المركبة.");
  if(isPropertyCategory(cat)&&!property)return fail("حدد العقار.");
  if(needsMeter(cat)&&!meter)return fail("حدد عداد الكهرباء.");
  var beforeEdit=cloneJSON(e);e.amount=Math.round(amount*100)/100;e.date=date;e.desc=safeText(desc,140);e.category=cat;e.vehicle=vehicle;e.property=property;e.meter=meter;e.note=safeText($("edit-note").value,80);
  e.synced=false;e.updatedAt=new Date().toISOString();
  if(!(await saveExpenses())){Object.keys(e).forEach(function(k){delete e[k]});Object.assign(e,beforeEdit);render();return fail("تعذر التحقق من حفظ التعديل؛ تم التراجع عن التغيير في الذاكرة.")}
  $("edit-modal").classList.remove("show");editingId=null;render();showToast("تم تعديل العملية",false);
}

async function removeExpense(id){if(!writable())return;var i=expenses.findIndex(function(e){return e.id===id});if(i<0)return;var item=expenses[i];expenses.splice(i,1);if(!(await saveExpenses())){expenses.splice(i,0,item);render();showToast("تعذر التحقق من الحذف، لم تتغير البيانات",false);return}pendingDelete={item:item,index:i};render();showToast("تم حذف العملية",true);clearTimeout(undoTimer);undoTimer=setTimeout(function(){pendingDelete=null;$("toast").classList.remove("show")},5000)}
async function undo(){if(!writable())return;if(!pendingDelete)return;var p=pendingDelete;expenses.splice(p.index,0,p.item);if(!(await saveExpenses())){expenses.splice(p.index,1);showToast("تعذر التراجع بأمان",false);return}pendingDelete=null;render();$("toast").classList.remove("show")}
function showToast(text,undoable){$("toast-text").textContent=text;$("undo-btn").classList.toggle("hidden",!undoable);$("toast").classList.add("show");if(!undoable)setTimeout(function(){$("toast").classList.remove("show")},2200)}

function go(view){currentView=view;document.querySelectorAll(".view").forEach(function(v){v.classList.toggle("active",v.dataset.view===view)});document.querySelectorAll(".navbtn").forEach(function(b){b.classList.toggle("active",b.dataset.go===view)});window.scrollTo({top:0,behavior:"smooth"});if(view==="add")setTimeout(function(){$("f-amount").focus()},160)}
function csvSafe(v){return Core.csvSafe(v)}
function download(name,text,type){var blob=new Blob([text],{type:type||"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url)},10000)}
function fallbackCopy(text){var ta=document.createElement("textarea");ta.value=text;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.focus();ta.select();var ok=false;try{ok=document.execCommand("copy")}catch(e){}ta.remove();return ok}
async function copySync(){
  if(!writable())return;var p=expenses.filter(function(e){return e.synced===false}).sort(function(a,b){return a.date.localeCompare(b.date)});if(!p.length){$("sync-hint").textContent="لا توجد عمليات جديدة.";return}
  var by={};p.forEach(function(e){(by[e.date]=by[e.date]||[]).push(e)});var lines=["عمليات جديدة من FuelMind:"];Object.keys(by).sort().forEach(function(d){lines.push("",d+":");by[d].forEach(function(e){var tags=[e.category];if(e.vehicle)tags.push(vehicleName(e.vehicle));if(e.property)tags.push(propertyName(e.property));if(e.meter)tags.push(meterName(e.meter));lines.push("- "+Number(e.amount).toFixed(2)+" ريال — "+e.desc+" ("+tags.join(" · ")+")")})});var text=lines.join("\n"),ok=false;try{if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(text);ok=true}}catch(e){}if(!ok)ok=fallbackCopy(text);if(!ok){$("sync-hint").textContent="تعذر النسخ تلقائيًا، ولم تتغير حالة العمليات.";return}var prev=p.map(function(e){return e.synced});p.forEach(function(e){e.synced=true});if(!(await saveExpenses())){p.forEach(function(e,i){e.synced=prev[i]});$("sync-hint").textContent="تم النسخ، لكن تعذر التحقق من تحديث حالة المزامنة.";return}$("sync-hint").textContent="تم نسخ "+p.length+" عملية بنجاح.";render()
}
function quickHash(text){return Core.quickHash(text)}
function stateCanonical(){return JSON.stringify({expenses:expenses,config:config,history:history,categories:categories})}
function stateSignature(){return quickHash(stateCanonical())}
async function stateDigest(){return await sha256(stateCanonical())}
function ageText(ms){var h=Math.floor(ms/3600000);if(h<1)return"أقل من ساعة";if(h<24)return h+" ساعة";var d=Math.floor(h/24);return d+" يوم"}
async function renderBackupFreshness(){
  var seq=++backupFreshnessSeq,box=$("backup-freshness"),title=$("backup-freshness-title"),copy=$("backup-freshness-copy");if(!box||!title||!copy)return;
  box.className="backup-freshness warn";
  if(!backupMeta||!backupMeta.generatedAt){title.textContent="لا توجد نسخة حديثة مسجلة";copy.textContent="أنشئ نسخة JSON بعد اكتمال الاختبار أو بعد أي تغييرات مهمة.";return}
  if(!backupMeta.confirmedAt){box.className="backup-freshness warn";title.textContent="تم إنشاء نسخة — تأكد من حفظ الملف";copy.textContent="FuelMind بدأ تنزيل ملف JSON، لكنه لا يستطيع التأكد من أن iOS حفظه فعليًا. افتح «الملفات» وتأكد من وجوده ثم اضغط زر التأكيد أدناه.";return}
  var quickChanged=backupMeta.signature&&backupMeta.signature!==stateSignature(),currentStrong=(!quickChanged&&backupMeta.secureSignature)?await stateDigest():"",changed=quickChanged||(backupMeta.secureSignature?(!currentStrong||backupMeta.secureSignature!==currentStrong):(backupMeta.signature!==stateSignature()));if(seq!==backupFreshnessSeq)return;var t=new Date(backupMeta.generatedAt).getTime();
  if(!isFinite(t)){box.className="backup-freshness bad";title.textContent="تعذر التحقق من تاريخ النسخة";copy.textContent="أنشئ نسخة جديدة قبل أي تغيير جوهري.";return}
  var age=Math.max(0,Date.now()-t);
  if(changed){box.className="backup-freshness bad";title.textContent="النسخة السابقة لا تشمل أحدث تغييراتك";copy.textContent="آخر نسخة أنشأها FuelMind منذ "+ageText(age)+"، لكن حالة البيانات الحالية تغيّرت بعدها. أنشئ نسخة جديدة.";return}
  if(age<=24*3600000){box.className="backup-freshness good";title.textContent="النسخة الاحتياطية حديثة جدًا";copy.textContent="آخر نسخة أنشأها FuelMind منذ "+ageText(age)+" وتطابق الحالة الحالية ببصمة قوية.";return}
  if(age<=7*24*3600000){box.className="backup-freshness warn";title.textContent="النسخة الاحتياطية ما زالت حديثة";copy.textContent="عمر النسخة "+ageText(age)+" وتطابق الحالة الحالية. يُفضّل تجديدها عند أول تغيير مهم.";return}
  box.className="backup-freshness bad";title.textContent="النسخة الاحتياطية قديمة";copy.textContent="مرّ على آخر نسخة "+ageText(age)+". أنشئ نسخة جديدة قبل أي تغيير جوهري.";
}
function backupFreshnessWarning(p){
  if(!p||!p.exportedAt)return"هذه النسخة لا تحتوي تاريخ تصدير موثوق.";
  var t=new Date(p.exportedAt).getTime();if(!isFinite(t))return"تعذر قراءة تاريخ النسخة.";
  if(t>Date.now()+5*60000)return"تنبيه: تاريخ النسخة يقع في المستقبل مقارنة بساعة الجهاز.";var age=Math.max(0,Date.now()-t);if(age>30*24*3600000)return"تنبيه: عمر النسخة أكثر من 30 يومًا.";if(age>7*24*3600000)return"تنبيه: عمر النسخة أكثر من 7 أيام.";return"";
}
function exportCSV(){var rows=[["التاريخ","البند الرئيسي","الفئة","المركبة","العقار","العداد","الوصف","الملاحظة","النوع","المبلغ"]];expenses.slice().sort(function(a,b){return a.date.localeCompare(b.date)}).forEach(function(e){rows.push([e.date,catGroup(e.category),e.category,vehicleName(e.vehicle),propertyName(e.property),meterName(e.meter),e.desc,e.note||"",kindLabel(catKind(e.category)),e.amount])});download("FuelMind-"+config.cycleStart+".csv","\uFEFF"+rows.map(function(r){return r.map(csvSafe).join(",")}).join("\r\n"),"text/csv;charset=utf-8")}
async function sha256(text){if(!(window.crypto&&crypto.subtle))return"";var buf=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(text));return Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,"0")}).join("")}
async function backup(){
  var core={product:"FuelMind",version:"1.5",schema:3,exportedAt:new Date().toISOString(),config:config,categories:categories,expenses:expenses,history:history};
  var canonical=JSON.stringify(core),hash=await sha256(canonical);if(!hash){showToast("تعذر تشغيل SHA-256؛ لم يتم إنشاء نسخة غير محمية",false);return}
  var out=Object.assign({},core,{integrity:{algorithm:"SHA-256",hash:hash,records:expenses.length}});
  download("FuelMind-backup-"+todayISO()+"-"+pad(new Date().getHours())+pad(new Date().getMinutes())+".json",JSON.stringify(out,null,2),"application/json;charset=utf-8");
  backupMeta={generatedAt:core.exportedAt,confirmedAt:null,signature:stateSignature(),secureSignature:await stateDigest(),records:expenses.length,total:totals().total,version:"1.5"};
  if(!(await verifiedSet("backup-meta",JSON.stringify(backupMeta))))showToast("تم إنشاء الملف، لكن تعذر تسجيل وقت النسخة على الجهاز",false);
  else showToast("تم تجهيز ملف النسخة. تأكد من ظهوره في تطبيق «الملفات» ثم أكّد الحفظ.",false);
  await renderBackupFreshness();
}
async function readRestoreFile(file){
  if(file&&typeof file.text==="function")return await file.text();
  return await new Promise(function(resolve,reject){
    var r=new FileReader();
    r.onload=function(){resolve(String(r.result||""))};
    r.onerror=function(){reject(r.error||new Error("تعذر قراءة الملف"))};
    r.readAsText(file,"utf-8");
  });
}
async function verifyBackupIntegrity(p){
  var modern=!!(p&&Number(p.schema)>=3&&String(p.version||"").indexOf("1.5")===0);
  if(!p||!p.integrity)return modern?{ok:false,protected:false,reason:"نسخة 1.5 الحديثة بلا معلومات سلامة"}:{ok:true,protected:false};
  if(p.integrity.algorithm==="none")return modern?{ok:false,protected:false,reason:"نسخة 1.5 الحديثة لا تقبل خفض الحماية إلى none"}:{ok:true,protected:false};
  if(p.integrity.algorithm!=="SHA-256")return{ok:false,protected:false,reason:"خوارزمية سلامة غير مدعومة"};
  if(!/^[a-f0-9]{64}$/i.test(String(p.integrity.hash||"")))return{ok:false,protected:true,reason:"بصمة SHA-256 غير صالحة"};
  if(p.integrity.records!=null&&Number(p.integrity.records)!==(Array.isArray(p.expenses)?p.expenses.length:-1))return{ok:false,protected:true,reason:"عدد السجلات لا يطابق بيانات النسخة"};
  var core={product:p.product,version:p.version,schema:p.schema,exportedAt:p.exportedAt,config:p.config,categories:p.categories,expenses:p.expenses,history:p.history},h=await sha256(JSON.stringify(core));
  if(!h)return{ok:false,protected:true,reason:"تعذر تشغيل SHA-256 على هذا الجهاز"};
  return{ok:h===p.integrity.hash,protected:true,reason:h===p.integrity.hash?"":"بصمة الملف لا تطابق محتواه"};
}
function sanitizeConfig(cfg){return Core.sanitizeConfig(cfg,todayISO())}
function sanitizeExpenseArray(ex,label){return Core.sanitizeExpenseArray(ex,label||"النسخة",todayISO())}
function sanitizeHistory(h){return Core.sanitizeHistory(h,todayISO())}
function normalizeRestorePayload(p,sourceLabel){
  if(!p||typeof p!=="object"||Array.isArray(p))throw new Error("صيغة النسخة غير صحيحة");
  var recovery=sourceLabel==="نقطة الأمان";if(!recovery&&p.product!=="FuelMind")throw new Error("الملف ليس نسخة FuelMind معروفة");if(p.schema!=null&&(!Number.isInteger(Number(p.schema))||Number(p.schema)>3||Number(p.schema)<1))throw new Error("إصدار بنية النسخة غير مدعوم");
  if(p.config&&p.config.cycleStart&&!isValidISODate(p.config.cycleStart))throw new Error("تاريخ بداية الدورة في النسخة غير صالح");var clean=sanitizeExpenseArray(p.expenses,"النسخة");var safeCfg=sanitizeConfig(p.config),cats=Array.isArray(p.categories)?mergeCategories(p.categories):mergeCategories(categories),hist=sanitizeHistory(p.history);
  return{config:safeCfg,categories:cats,expenses:clean,history:hist};
}
async function applyRestorePayload(p,sourceLabel){
  if(!writable())throw new Error("FuelMind في وضع الأمان للقراءة فقط");var integ=await verifyBackupIntegrity(p);if(!integ.ok)throw new Error("فشل فحص سلامة النسخة: "+(integ.reason||"بصمة غير مطابقة"));
  var n=normalizeRestorePayload(p,sourceLabel),recovery=sourceLabel==="نقطة الأمان";
  if(!recovery&&!integ.protected){if(!confirm("هذه نسخة قديمة بلا بصمة SHA-256؛ يمكن استعادتها للتوافق فقط، لكن لا يمكن إثبات عدم تعديلها. متابعة؟"))throw new Error("ألغيت استعادة نسخة غير محمية ببصمة")};
  var freshness=backupFreshnessWarning(p);
  if(freshness&&!recovery){if(!confirm(freshness+" هل تريد المتابعة؟ سيتم إنشاء rollback حقيقي قبل الاستعادة."))throw new Error("ألغيت الاستعادة بعد تنبيه حداثة النسخة")};
  if(!recovery&&n.expenses.length<expenses.length){if(!confirm("النسخة تحتوي "+n.expenses.length+" عملية بينما الجهاز يحتوي "+expenses.length+". المتابعة ستستبدل الحالة الحالية، مع rollback تلقائي إذا فشل الحفظ. متابعة؟"))throw new Error("ألغيت الاستعادة بعد مقارنة عدد العمليات")};
  if(!recovery)await createRecoveryPoint("قبل الاستعادة 1.5 RC3");
  await transactionalCommit(n,"استعادة "+sourceLabel);
  applyStateToMemory(n);
  var verify=parse(await Store.get("expenses"),[]);
  if(!Array.isArray(verify)||verify.length!==expenses.length)throw new Error("تعذر التحقق من commit الاستعادة");
  syncSettings();render();go("home");
  $("restore-status").textContent="تمت الاستعادة من "+sourceLabel+" — "+expenses.length+" عملية — rollback 1.5 RC3 مسلح.";
  showToast("تمت الاستعادة بعملية موحدة آمنة",false);
}
async function restore(file){
  var status=$("restore-status");
  try{
    if(!file)throw new Error("لم يتم اختيار ملف");
    if(file.size>2*1024*1024)throw new Error("حجم النسخة أكبر من 2 ميجابايت، أوقف الاستعادة وراجع الملف.");
    status.textContent="جارٍ قراءة "+file.name+"…";
    var text=(await readRestoreFile(file)).replace(/^\uFEFF/,"").trim();
    var p=JSON.parse(text);
    await applyRestorePayload(p,"الملف");
  }catch(e){
    status.textContent="تعذر الاستعادة: "+(e&&e.message?e.message:"خطأ غير معروف");
    alert(status.textContent);
  }finally{
    $("restore-file").value="";
  }
}
function decodeRestoreToken(text){return Core.decodeRestoreToken(text)}
async function restoreFromToken(){
  var status=$("restore-status");
  try{
    var text=$("restore-token").value.trim();
    if(!text)throw new Error("الصق رمز الاستعادة أولًا");
    status.textContent="جارٍ فحص رمز الاستعادة…";
    var p=decodeRestoreToken(text);
    await applyRestorePayload(p,"الرمز");
    $("restore-token").value="";
  }catch(e){
    status.textContent="تعذر الاستعادة من الرمز: "+(e&&e.message?e.message:"خطأ غير معروف");
    alert(status.textContent);
  }
}
async function confirmNewCycle(){
  if(!writable())return;var btn=$("cycle-confirm");btn.disabled=true;
  try{
    await createRecoveryPoint("قبل بدء دورة جديدة 1.5 RC3");
    var snap={id:uid(),cycleStart:config.cycleStart,cycleDays:config.cycleDays,budget:config.budget,savingsTarget:config.savingsTarget,total:totals().total,expenses:expenses.map(function(e){return Object.assign({},e)}),archivedAt:new Date().toISOString()};
    var next={expenses:[],categories:categories.slice(),config:Object.assign({},config,{cycleStart:todayISO()}),history:history.concat([snap])};
    await transactionalCommit(next,"بدء دورة جديدة");
    applyStateToMemory(next);
    backupMeta=null;await Store.remove("backup-meta");
    $("cycle-modal").classList.remove("show");syncSettings();render();go("home");showToast("بدأت الدورة الجديدة بcommit موحد",false);
  }catch(e){alert((e&&e.message?e.message:"تعذر بدء الدورة")+" لم يتم اعتماد دورة جديدة.")}
  finally{btn.disabled=false}
}

function diagAdd(host,state,title,copy){var r=document.createElement("div");r.className="diag-row "+state;var i=document.createElement("div");i.className="diag-icon";i.textContent=state==="pass"?"✓":(state==="warn"?"!":"×");var b=document.createElement("div"),st=document.createElement("strong"),sp=document.createElement("span");st.textContent=title;sp.textContent=copy;b.append(st,sp);r.append(i,b);host.appendChild(r)}
async function readonlyCoreSnapshot(){var o={};try{for(var i=0;i<CORE_KEYS.length;i++)o[CORE_KEYS[i]]=await Store.get(CORE_KEYS[i])}catch(e){o.error=String(e&&e.message||e)}return o}
async function runIphoneDiagnostics(){
  var btn=$("run-iphone-check"),host=$("diag-results"),summary=$("diag-summary");btn.disabled=true;host.replaceChildren();summary.textContent="جارٍ الفحص";
  var before=await readonlyCoreSnapshot(),beforeMem=JSON.stringify(coreState()),pass=0,warn=0,fail=0;
  function add(st,t,c){diagAdd(host,st,t,c);if(st==="pass")pass++;else if(st==="warn")warn++;else fail++}
  try{
    add("pass","إصدار الفحص","FuelMind 1.5 RC3 Professional Hardened — صفحة الفحص تعمل بالقراءة فقط.");
    add("pass","بصمة الحالة في الذاكرة","البصمة الحالية: "+stateSignature()+" — للمقارنة داخل جلسة الفحص فقط.");
    var ua=navigator.userAgent||"",ios=/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);add(ios?"pass":"warn","بيئة iOS / iPhone",ios?"تم التعرف على جهاز iOS.":"لم يستطع المتصفح تأكيد iOS؛ بقية الفحوص تستمر.");
    var secure=location.protocol==="https:"||location.hostname==="localhost";add(secure?"pass":"fail","اتصال آمن",secure?"الصفحة تعمل عبر HTTPS.":"الصفحة ليست على HTTPS، وهذا يمنع بعض خصائص PWA.");
    var sharedGithub=/\.github\.io$/i.test(location.hostname)&&location.pathname.split("/").filter(Boolean).length>0;add(sharedGithub?"warn":"pass","عزل أصل البيانات",sharedGithub?"التطبيق يعمل كموقع مشروع على GitHub Pages؛ التخزين المحلي مشترك مع أي صفحة أخرى تحت نفس نطاق username.github.io. يوصى بنطاق مستقل عند الانتقال من الاستخدام الشخصي إلى مستوى إنتاجي حساس.":"أصل التطبيق غير ظاهر كموقع مشروع GitHub Pages مشترك.");
    if(navigator.storage&&navigator.storage.persisted){var persisted=await navigator.storage.persisted();add(persisted?"pass":"warn","استمرارية التخزين",persisted?"المتصفح يبلغ أن التخزين مُستمر.":"التخزين ليس مضمون الاستمرار من المتصفح؛ النسخ الاحتياطية الحديثة تبقى ضرورية.")}else add("warn","استمرارية التخزين","واجهة persisted() غير متاحة؛ لا يمكن تأكيد مقاومة حذف التخزين بواسطة النظام.");
    var standalone=(window.matchMedia&&matchMedia("(display-mode: standalone)").matches)||navigator.standalone===true;add(standalone?"pass":"warn","وضع التطبيق المثبّت",standalone?"FuelMind يعمل كـ PWA مستقل.":"الصفحة مفتوحة داخل المتصفح وليست من أيقونة الشاشة الرئيسية.");
    if("serviceWorker" in navigator){var reg=await navigator.serviceWorker.getRegistration();add(reg&&reg.active?"pass":"warn","Service Worker",reg&&reg.active?"Service Worker نشط: "+(reg.active.scriptURL.split("/").pop()||"sw.js"):"الدعم موجود لكن العامل غير نشط بعد.")}else add("fail","Service Worker","هذا المتصفح لا يدعم Service Worker.");
    if("caches" in window){var keys=await caches.keys(),fm=keys.filter(function(k){return k.indexOf("fuelmind-v1.5-rc3")>-1});if(fm.length){var cc=await caches.open(fm[0]),coreHits=await Promise.all(["./index.html","./core.js","./app.js","./manifest.webmanifest"].map(function(x){return cc.match(x)}));add(coreHits.every(Boolean)?"pass":"warn","كاش FuelMind 1.5 RC3",coreHits.every(Boolean)?"الكاش RC3 موجود ويحتوي ملفات النواة.":"الكاش RC3 موجود لكن أحد ملفات النواة غير متاح.")}else add("warn","كاش FuelMind 1.5 RC3","لم يظهر كاش RC3 بعد؛ قد يحتاج التطبيق إعادة فتح بعد النشر.")}else add("warn","Cache API","Cache API غير متاح في هذه الجلسة.");
    var raw=await readonlyCoreSnapshot();if(raw.error)add("fail","قراءة التخزين المحلي",raw.error);else{var parsable=true;CORE_KEYS.forEach(function(k){if(raw[k]!==null){try{JSON.parse(raw[k])}catch(e){parsable=false}}});add(parsable?"pass":"fail","قابلية قراءة بيانات FuelMind",parsable?"تمت قراءة مفاتيح الحالة الأربعة دون كتابة أي قيمة.":"هناك قيمة غير قابلة للتحليل في التخزين المحلي.")}
    var ids={},dup=0,bad=0;expenses.forEach(function(e){if(ids[e.id])dup++;ids[e.id]=1;if(!e.id||!/^\d{4}-\d{2}-\d{2}$/.test(String(e.date||""))||!isFinite(Number(e.amount))||Number(e.amount)<=0)bad++});add(!dup&&!bad?"pass":"fail","سلامة سجل المصروفات",!dup&&!bad?expenses.length+" عملية صالحة، دون معرفات مكررة.":"غير صالح: "+bad+" · معرفات مكررة: "+dup);
    if(navigator.storage&&navigator.storage.estimate){var est=await navigator.storage.estimate(),used=Number(est.usage||0),quota=Number(est.quota||0);add("pass","سعة التخزين","المستخدم تقريبًا "+Math.round(used/1024/1024)+" م.ب من "+Math.round(quota/1024/1024)+" م.ب المتاحة للمتصفح.")}else add("warn","تقدير مساحة التخزين","واجهة تقدير المساحة غير متاحة، ولا يؤثر ذلك على بياناتك الحالية.");
    var after=await readonlyCoreSnapshot(),afterMem=JSON.stringify(coreState()),untouched=JSON.stringify(before)===JSON.stringify(after)&&beforeMem===afterMem;add(untouched?"pass":"fail","عدم لمس البيانات",untouched?"البصمة قبل الفحص وبعده متطابقة 100%. لم يتغير أي مصروف أو إعداد.":"اختلفت البصمة أثناء الفحص؛ أوقف الاعتماد وراجع الحالة.");
  }catch(e){add("fail","اكتمال الفحص",e&&e.message?e.message:"خطأ غير معروف")}
  summary.textContent=fail?"FIX — "+fail+" فشل":(warn?"PASS مع "+warn+" تنبيه":"PASS");btn.disabled=false;
}

function bind(){
  document.querySelectorAll(".navbtn").forEach(function(b){b.addEventListener("click",function(){go(b.dataset.go)})});
  $("add-expense").addEventListener("click",addExpense);$("undo-btn").addEventListener("click",undo);
  $("duplicate-cancel").addEventListener("click",function(){hideDuplicate();$("f-amount").focus()});
  $("duplicate-force").addEventListener("click",async function(){if(!pendingCandidate)return;var c=pendingCandidate;hideDuplicate();await persistCandidate(c)});
  $("tx-search").addEventListener("input",renderTransactions);$("unsynced-filter").addEventListener("click",function(){showUnsyncedOnly=!showUnsyncedOnly;this.classList.toggle("warn",showUnsyncedOnly);this.textContent=showUnsyncedOnly?"عرض الكل":"غير المرسلة";renderTransactions()});
  $("f-category").addEventListener("change",updateDynamicFields);$("f-property").addEventListener("change",setMeterOptions);
  $("f-amount").addEventListener("input",hideDuplicate);$("f-date").addEventListener("change",hideDuplicate);
  $("f-desc").addEventListener("input",function(){var text=this.value,s=suggestCategory(text),v=inferVehicle(text),p=inferProperty(text),m=inferMeter(text);if(v)$("f-vehicle").value=v;if(p)$("f-property").value=p;if(m){var mo=ELECTRIC_METERS.find(function(x){return x.id===m});if(mo){$("f-property").value=mo.property;setMeterOptions();$("f-meter").value=m}}if(s){suggestedName=s.name;$("apply-suggestion").textContent=s.group+" ← "+s.name;$("suggestion").style.display="block"}else{$("suggestion").style.display="none";suggestedName=null}});
  $("apply-suggestion").addEventListener("click",function(){if(!suggestedName)return;$("f-category").value=suggestedName;updateDynamicFields();var p=inferProperty($("f-desc").value);if(p)$("f-property").value=p;var v=inferVehicle($("f-desc").value);if(v)$("f-vehicle").value=v;var m=inferMeter($("f-desc").value);if(m){var mo=ELECTRIC_METERS.find(function(x){return x.id===m});if(mo){$("f-property").value=mo.property;setMeterOptions();$("f-meter").value=m}}$("suggestion").style.display="none"});
  $("copy-sync").addEventListener("click",copySync);
  ["budget","cycle-days","cycle-start","savings-target"].forEach(function(id){$(id).addEventListener("change",async function(){if(!writable()){syncSettings();return}var prev=Object.assign({},config),budget=Number($("budget").value),cycleDays=Number($("cycle-days").value),cycleStart=$("cycle-start").value,savingsTarget=Number($("savings-target").value);if(!isFinite(budget)||budget<1||budget>10000000||!Number.isInteger(cycleDays)||cycleDays<1||cycleDays>62||!isValidISODate(cycleStart)||cycleStart>todayISO()||!isFinite(savingsTarget)||savingsTarget<0||savingsTarget>budget){syncSettings();showToast("الإعدادات المدخلة غير صالحة، لم يتم حفظها",false);return}config={budget:budget,cycleDays:cycleDays,cycleStart:cycleStart,savingsTarget:savingsTarget};if(!(await saveConfig())){config=prev;syncSettings();showToast("تعذر حفظ الإعدادات بأمان",false);return}render()})});
  $("open-iphone-check").addEventListener("click",function(){go("iphone-check")});
  $("back-from-iphone-check").addEventListener("click",function(){go("settings")});
  $("run-iphone-check").addEventListener("click",runIphoneDiagnostics);
  $("category-search").addEventListener("input",function(){var s=suggestCategory(this.value);if(this.value.trim()){if(s){$("category-search-result").textContent="الأنسب: "+s.group+" ← "+s.name+" — "+s.desc;$("category-search-result").style.color="var(--teal)"}else{$("category-search-result").textContent="لم أجد تطابقًا واضحًا. راجع البنود الظاهرة أدناه.";$("category-search-result").style.color="var(--gold)"}}else{$("category-search-result").textContent="اكتب كلمة لمعرفة التصنيف المناسب.";$("category-search-result").style.color="var(--muted)"}renderGuide()});
  $("export-csv").addEventListener("click",exportCSV);$("backup-json").addEventListener("click",backup);
  $("confirm-backup-saved").addEventListener("click",async function(){if(!backupMeta||!backupMeta.generatedAt){showToast("أنشئ نسخة JSON أولًا",false);return}backupMeta.confirmedAt=new Date().toISOString();if(!(await verifiedSet("backup-meta",JSON.stringify(backupMeta)))){backupMeta.confirmedAt=null;showToast("تعذر تسجيل تأكيد حفظ النسخة",false);return}showToast("تم اعتماد وجود ملف النسخة على الجهاز",false);await renderBackupFreshness()});
  var restoreInput=$("restore-file"),lastRestoreFile="";
  function pickRestoreFile(){
    if(this.files&&this.files[0]){
      var f=this.files[0],sig=f.name+"|"+f.size+"|"+f.lastModified;
      if(sig===lastRestoreFile)return;
      lastRestoreFile=sig;restore(f).finally(function(){lastRestoreFile=""});
    }
  }
  restoreInput.addEventListener("input",pickRestoreFile);
  restoreInput.addEventListener("change",pickRestoreFile);
  $("restore-token-btn").addEventListener("click",restoreFromToken);
  $("make-recovery").addEventListener("click",async function(){if(!writable())return;try{var p=await createRecoveryPoint("نقطة أمان يدوية");showToast("تم إنشاء نقطة أمان",false);renderRecoveryStatus(p)}catch(e){showToast("تعذر إنشاء نقطة الأمان",false)}});
  $("restore-recovery").addEventListener("click",restoreRecoveryPoint);
  $("privacy-toggle").addEventListener("click",function(){var on=!document.body.classList.contains("privacy-mode");document.body.classList.toggle("privacy-mode",on);this.classList.toggle("on",on);this.setAttribute("aria-checked",String(on));try{localStorage.setItem("fuelmind-privacy",on?"1":"0")}catch(e){}});
  $("new-cycle").addEventListener("click",function(){if(!writable())return;var u=expenses.filter(function(e){return e.synced===false}).length;$("cycle-modal-copy").textContent=(u?"لديك "+u+" عملية لم تُنسخ للمحادثة. ":"")+"سيتم أرشفة الدورة وبدء الجديدة داخل commit موحد مع سجل rollback. إذا فشل أي جزء تعود الحالة السابقة كاملة.";$("cycle-modal").classList.add("show")});$("cycle-cancel").addEventListener("click",function(){$("cycle-modal").classList.remove("show")});$("cycle-confirm").addEventListener("click",confirmNewCycle);$("cycle-modal").addEventListener("click",function(e){if(e.target===this)this.classList.remove("show")});
  $("edit-cancel").addEventListener("click",function(){$("edit-modal").classList.remove("show");editingId=null});
  $("edit-save").addEventListener("click",saveEdit);
  $("edit-category").addEventListener("change",updateEditDynamic);
  $("edit-property").addEventListener("change",function(){if(needsMeter($("edit-category").value))fillMeterSelect("edit-meter",this.value,"")});
  $("edit-modal").addEventListener("click",function(e){if(e.target===this){this.classList.remove("show");editingId=null}});
}
async function init(){
  bind();
  var storageOk=await Store.init();if(!storageOk){safeMode=true;enterSafeMode("التخزين الدائم غير متاح على هذا الجهاز");setSave("وضع أمان — التخزين غير متاح",false);return}
  var recovered=null,recoveryError=null,loadError=null;try{recovered=await recoverInterruptedTransaction()}catch(e){recoveryError=e;safeMode=true}
  try{await load()}catch(e){loadError=e;safeMode=true}
  if(loadError){enterSafeMode(loadError&&loadError.message?loadError.message:"تعذر التحقق من البيانات المحلية");alert("حماية FuelMind 1.5 RC3: "+(loadError&&loadError.message?loadError.message:"تعذر التحقق من البيانات المحلية")+". لم تتم إعادة كتابة البيانات، وتم إيقاف التعديل.");return}
  render();setSave(recoveryError?"وضع أمان — قراءة فقط":"جاهز",!recoveryError);
  if(recoveryError){enterSafeMode(recoveryError&&recoveryError.message?recoveryError.message:"تعذر فحص العملية السابقة");alert("حماية FuelMind 1.5 RC3: "+(recoveryError&&recoveryError.message?recoveryError.message:"تعذر فحص العملية السابقة")+". تم تفعيل وضع القراءة فقط.")}
  if(recovered&&recovered.rolledBack)showToast("تم rollback تلقائي لعملية غير مكتملة: "+recovered.label,false);
  try{var pv=localStorage.getItem("fuelmind-privacy")==="1";document.body.classList.toggle("privacy-mode",pv);$("privacy-toggle").classList.toggle("on",pv);$("privacy-toggle").setAttribute("aria-checked",String(pv))}catch(e){}
  try{renderRecoveryStatus(await loadRecoveryPoint())}catch(e){}
  if("serviceWorker" in navigator && location.protocol.indexOf("http")===0){try{var reg=await navigator.serviceWorker.register("./sw.js");if(reg&&reg.update)await reg.update()}catch(e){}}
}
if(window.__FUELMIND_TEST_MODE__===true){window.__FUELMIND_TEST_API__=Object.freeze({uid:uid,safeText:safeText,isValidISODate:isValidISODate,sanitizeConfig:sanitizeConfig,sanitizeExpenseArray:sanitizeExpenseArray,sanitizeHistory:sanitizeHistory,decodeRestoreToken:decodeRestoreToken,verifyBackupIntegrity:verifyBackupIntegrity,duplicateOf:duplicateOf,rawEqual:rawEqual,validRawState:validRawState,transactionalCommit:transactionalCommit,recoverInterruptedTransaction:recoverInterruptedTransaction,Store:Store,stateToRaw:stateToRaw,sha256:sha256,csvSafe:csvSafe,__setExpenses:function(v){expenses=v},__getExpenses:function(){return expenses}});}else{init();}
})();