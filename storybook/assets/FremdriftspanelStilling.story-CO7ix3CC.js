import{aD as I,M as w,j as t,q as k,S as x,cx as j,cB as b,cD as g,cy as u,P as y,cR as _}from"./iframe-Dx5p-74P.js";import{w as m,c as A}from"./ContextDecorators-BCgGVb31.js";import{F as N,A as v}from"./FullførtStilling-GiZqFcf_.js";import{R as T}from"./GjenåpneStillingKnapp-CHVlVegV.js";import{T as D}from"./TilgangskontrollForInnhold-kxj8jEIM.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BH3Z2Hac.js";import"./OrganisasjonsnummerAlert-BaL2Wpxk.js";import"./VStack-M4BYiSCC.js";import"./BasePrimitive-HT4iaqsB.js";import"./List-Ccl9AqJr.js";import"./Link-CQRIlL-P.js";import"./KandidatHendelseTag-Ckw2Yf1k.js";import"./Tag-BBp8XsrL.js";import"./ChatExclamationmark-DE5DLdsZ.js";import"./FileXMark-BZbSkgiU.js";import"./Trash-InTWHO4k.js";import"./HandShakeHeart-C3Fy77aQ.js";import"./Calendar-CUrO_5Yz.js";import"./ThumbUp-DV7m7lpk.js";import"./Table-CxSSnKIY.js";import"./util-BmmH2cUm.js";import"./parse-QRK9mKr4.js";import"./getDefaultOptions-VUvHQon4.js";import"./parseISO-CfdHbu5H.js";import"./index-DKRmfY_S.js";import"./index-B40KJ5b4.js";import"./isBefore-DNN8erOw.js";import"./util-BZefUNq6.js";import"./accordion-DFkCBSUs.js";import"./index-D4BDg6X-.js";import"./index-DT12R3Z_.js";import"./index-BoRr_0rQ.js";import"./ChevronDown-D21O9Nae.js";import"./Box-DyEEFrgN.js";import"./Bell-phVgWuEf.js";import"./PersonChat-CR4S7PCY.js";import"./Eye-Cf7cSMQZ.js";import"./ProgressBar-dDrO0XBX.js";import"./EyeSlash-Ca2IAxw6.js";import"./CircleSlash-CtALDa4F.js";import"./Modal-CXmacE1j.js";import"./floating-ui.react-1bRgyrJ9.js";import"./Date.Input-Dap9AMiQ.js";import"./ReadOnlyIcon-CUSYp9cW.js";import"./useFormField-CieKNAG5.js";import"./useControllableState-BHffPqA3.js";import"./Modal.context-TxvMfdUR.js";import"./Checkbox-Dy7wwy-t.js";import"./Fieldset-C3BrUGad.js";import"./Pencil-DKq0cMkG.js";import"./PersonbrukerTekst-FFo9y6Rf.js";import"./ClockDashed-B8iQY_mf.js";import"./Tasklist-CLl6m2_1.js";import"./ErrorBoundary-WJOd_a1R.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Jt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Jt as default};
