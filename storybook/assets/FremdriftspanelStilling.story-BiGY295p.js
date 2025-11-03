import{aD as I,M as w,j as t,q as k,S as x,cx as j,cB as b,cD as g,cy as u,P as y,cR as _}from"./iframe-B_4Bmvgq.js";import{w as m,c as A}from"./ContextDecorators-B7JW1qJK.js";import{F as N,A as v}from"./FullførtStilling-Ck798GWv.js";import{R as T}from"./GjenåpneStillingKnapp-Cj-qCRDP.js";import{T as D}from"./TilgangskontrollForInnhold-nTbwZuB4.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-i_nfhuWU.js";import"./OrganisasjonsnummerAlert-CqgMt66G.js";import"./VStack-CfKwjGy1.js";import"./BasePrimitive-DQobvrvZ.js";import"./List-CzLJLjt6.js";import"./Link-BpNm44et.js";import"./KandidatHendelseTag-DytQV4w5.js";import"./Tag-De8rW7_j.js";import"./ChatExclamationmark-BbG6xmDN.js";import"./FileXMark-D6H9E5OH.js";import"./Trash-BLDYiN1k.js";import"./HandShakeHeart-B3JBqYbB.js";import"./Calendar-CNvG0z3N.js";import"./ThumbUp-cNmdmnjm.js";import"./Table-Bt8oMTeV.js";import"./util-DxRjoqmU.js";import"./parse-BWK0vuo5.js";import"./getDefaultOptions-zcAWsOsE.js";import"./parseISO-D8xjauEE.js";import"./index-kl9f-6X3.js";import"./index-B40KJ5b4.js";import"./isBefore-BimlqcNR.js";import"./util-DbDFcdAO.js";import"./accordion-C-B_9atM.js";import"./index-CiXBJIjE.js";import"./index-CFx1arJr.js";import"./index-Hova_Xdn.js";import"./ChevronDown-iJetkpSI.js";import"./Box-CuCz9Qqk.js";import"./Bell-CM4zu1aC.js";import"./PersonChat-DySgvoT5.js";import"./Eye-DM9q9VtA.js";import"./ProgressBar-tfWZ_VSq.js";import"./EyeSlash-B0mBu_3S.js";import"./CircleSlash-CIlgibQW.js";import"./Modal-BTkKakWf.js";import"./floating-ui.react-DvaqMJwp.js";import"./Date.Input-BzmHLEDM.js";import"./useFormField-6IqjGViV.js";import"./useControllableState-W5agygci.js";import"./Modal.context-BqzOV7AP.js";import"./Checkbox-rKbliTX7.js";import"./Fieldset-DGxPBBdq.js";import"./Pencil-czKviEJy.js";import"./PersonbrukerTekst-D7JekkQO.js";import"./ClockDashed-BPBTvm1a.js";import"./Tasklist-T73OS75R.js";import"./ErrorBoundary-CddxkPuD.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ut as default};
