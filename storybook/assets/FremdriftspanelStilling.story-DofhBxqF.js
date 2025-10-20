import{ac as I,ad as w,j as t,R as k,S as j,ch as x,cl as b,aG as g,ci as u,aP as y,cy as _}from"./iframe-BF8BNn-P.js";import{w as d,c as D}from"./ContextDecorators-CWL7Aeo9.js";import{F as N,A as v}from"./FullførtStilling-BKz3VLbu.js";import{R as T}from"./GjenåpneStillingKnapp-DAzsR1xB.js";import{T as A}from"./TilgangskontrollForInnhold-D-sp7QKw.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BXJD1A0s.js";import"./OrganisasjonsnummerAlert-IXrNVLwl.js";import"./VStack-CMeQnFcr.js";import"./BasePrimitive-BlsGsg21.js";import"./List-BM9N4mrD.js";import"./Link-DN5m26Rs.js";import"./KandidatHendelseTag-nU4MgnR-.js";import"./Tag-DXp4bEZw.js";import"./ChatExclamationmark-Br8h6JfZ.js";import"./FileXMark-iAfT_WZd.js";import"./Trash-C4_BLZyj.js";import"./HandShakeHeart-B72tsY5W.js";import"./Calendar-_1VseOVU.js";import"./ThumbUp-CsNb83Hv.js";import"./Table-D8vUaOQl.js";import"./util-Pkq9MnMO.js";import"./format-BHNDKqLI.js";import"./match-DiwQH8nR.js";import"./parseISO-euhGvvRy.js";import"./parse-D3BBtSad.js";import"./getDefaultOptions-Bp-ZLzIw.js";import"./util-9-sgCJTZ.js";import"./accordion-CS12It0H.js";import"./index-Bk7mbD61.js";import"./index-BSHSn8QK.js";import"./index-C9KuX6Su.js";import"./ChevronDown-CQEy5wB2.js";import"./Box-DF0rLyei.js";import"./Bell-DPYvvsiu.js";import"./PersonChat-Cn3ooJiU.js";import"./Eye-CGo6pVGZ.js";import"./ProgressBar-Bp0prsJW.js";import"./EyeSlash-D_OJvriV.js";import"./CircleSlash-CfMq7xTo.js";import"./Modal-59K-mOmj.js";import"./floating-ui.react-CEZCZn4x.js";import"./Date.Input-C1O_cGqo.js";import"./useFormField-5gDKVoHJ.js";import"./useControllableState-CH5q939z.js";import"./Modal.context-BhhqLRxX.js";import"./Checkbox-C3d1a4L6.js";import"./Fieldset-n-entfIS.js";import"./Pencil-maBziiR8.js";import"./PersonbrukerTekst-CaaBQDAh.js";import"./ClockDashed-BbQwqSVS.js";import"./Tasklist-BcR4cREN.js";import"./ErrorBoundary-BE62-ceM.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
