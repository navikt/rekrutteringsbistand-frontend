import{aD as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-C0grz2Wo.js";import{w as m,c as E}from"./ContextDecorators-DUBg21kn.js";import{F as N,A as v}from"./FullførtStilling-D0K-6I6i.js";import{R as T}from"./GjenåpneStillingKnapp-DiIE-AH-.js";import{T as D}from"./TilgangskontrollForInnhold-COoaY8FD.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CuatCgAP.js";import"./OrganisasjonsnummerAlert-BSPi1WiT.js";import"./VStack-iwEBrvXU.js";import"./BasePrimitive-YYZHIQKP.js";import"./List-Crl8BSVz.js";import"./Link-DostjHct.js";import"./KandidatHendelseTag-4Zvjjh9a.js";import"./Tag-D0ozGcTA.js";import"./ChatExclamationmark-BpPx1dnv.js";import"./FileXMark-C5WGqYyK.js";import"./Trash-BAy9I17o.js";import"./HandShakeHeart--RsNg5xC.js";import"./Calendar-B1UDYawr.js";import"./ThumbUp-CNdSxRt5.js";import"./Table-CDqAcG_J.js";import"./util-Ctc1EFpw.js";import"./parse-BNQC4k6h.js";import"./getDefaultOptions-B0HTFzI0.js";import"./parseISO-Du2aHfBC.js";import"./index-CBObkYOP.js";import"./index-B40KJ5b4.js";import"./isBefore-OXYI8Ltq.js";import"./util-CPaU3JU5.js";import"./accordion-C4aA0_ve.js";import"./index-vQN6CVAE.js";import"./index-Ty9ll2zt.js";import"./index-B4EMt8LM.js";import"./ChevronDown-DjL2dQ1d.js";import"./Box-DIYAtaZb.js";import"./Bell-DOgiwWEX.js";import"./PersonChat-BIUiFcYK.js";import"./Eye-OJ1FtK1d.js";import"./ProgressBar-5WpQJdb0.js";import"./EyeSlash-Dkl_cwBU.js";import"./CircleSlash-DdT1Boed.js";import"./Modal-CbC9uLc_.js";import"./floating-ui.react-DeVAIk4J.js";import"./Date.Input-CVFQR35B.js";import"./useFormField-BJjBkOln.js";import"./useControllableState-B8wREkvX.js";import"./Modal.context-DE4oVxi7.js";import"./Checkbox-Dgb6OnE5.js";import"./Fieldset-DCA6noEP.js";import"./Pencil-DRbiS5Zv.js";import"./PersonbrukerTekst-c6I4-I09.js";import"./ClockDashed-BipOAYuZ.js";import"./Tasklist-QthK4KvN.js";import"./ErrorBoundary-B_SM1hOs.js";function n({dropDown:r}){const{stillingsData:i,erEier:A}=I(),d=w(i,A),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=E({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=E({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
