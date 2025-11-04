import{aD as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-D5Hx8MOI.js";import{w as m,c as E}from"./ContextDecorators-D2NPIL1V.js";import{F as N,A as v}from"./FullførtStilling-CP9tN63L.js";import{R as T}from"./GjenåpneStillingKnapp-KcHfQF9a.js";import{T as D}from"./TilgangskontrollForInnhold-DvgJqbUh.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CY2SUsP-.js";import"./OrganisasjonsnummerAlert-ekewJOh6.js";import"./VStack--Wd9bffL.js";import"./BasePrimitive-0g_Rn9vf.js";import"./List-DT2p30nz.js";import"./Link-e5cgoETk.js";import"./KandidatHendelseTag-DBavK9Jn.js";import"./Tag-sqViv2P5.js";import"./ChatExclamationmark-BBZeh-kH.js";import"./FileXMark-YL5z_ic7.js";import"./Trash-D4lyxCuc.js";import"./HandShakeHeart-CCsq3XV6.js";import"./Calendar-bCXJqlLh.js";import"./ThumbUp-Bkl_gHlE.js";import"./Table-J1I1xChK.js";import"./util-BPTmFIB5.js";import"./parse-BtZCxJNG.js";import"./getDefaultOptions-BSV_6W0p.js";import"./parseISO-Bj7jC2Qz.js";import"./index-DvbjUxB4.js";import"./index-B40KJ5b4.js";import"./isBefore-dcDV6Iu_.js";import"./util-BVg7me_Z.js";import"./accordion-D0lZ2VVB.js";import"./index-D9pkl2tA.js";import"./index-DSGAI1A1.js";import"./index-DeCDyrqc.js";import"./ChevronDown-sV2brkBk.js";import"./Box-QhHhB2T-.js";import"./Bell-B9UfwiQE.js";import"./PersonChat-Dwf8xkJt.js";import"./Eye-DzzvNs_Z.js";import"./ProgressBar-CMS8LbC4.js";import"./EyeSlash-BcGFBeVx.js";import"./CircleSlash-DCgDXSuu.js";import"./Modal-CPp7OtiE.js";import"./floating-ui.react-B7GcXC42.js";import"./Date.Input-BNoCn-WA.js";import"./useFormField-CRwOs4JE.js";import"./useControllableState-BC3SVwpK.js";import"./Modal.context-ByVlJ93D.js";import"./Checkbox-DVDXXUig.js";import"./Fieldset-Cjpy4Qu3.js";import"./Pencil-JzGUZ_wD.js";import"./PersonbrukerTekst-iIQ4zhh_.js";import"./ClockDashed-CG1euXAa.js";import"./Tasklist-D4-8ir5j.js";import"./ErrorBoundary-BS3alnsJ.js";function n({dropDown:r}){const{stillingsData:i,erEier:A}=I(),d=w(i,A),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=E({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=E({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
