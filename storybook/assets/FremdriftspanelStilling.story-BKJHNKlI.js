import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-B2xGUNX-.js";import{w as m,c as D}from"./ContextDecorators-DARO_qRf.js";import{K as b}from"./schema.zod-Di4kNtGR.js";import{u as _}from"./useKandidatlisteForEier-hPIfFhot.js";import{F as y,A as N}from"./FullførtStilling-mTFS7AE4.js";import{R as T}from"./GjenåpneStillingKnapp-K9SoRzGS.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-DLHVA-Yz.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-iMCDFI9i.js";import"./OrganisasjonsnummerAlert-gjj98bPf.js";import"./VStack-LgcJaDfa.js";import"./BasePrimitive-AscQ94av.js";import"./List-BT2hrq8R.js";import"./Link-KW-0U3Oy.js";import"./KandidatHendelseTag-CZrPE1Ic.js";import"./Tag-DO0bA650.js";import"./ChatExclamationmark-BaqHWrX8.js";import"./FileXMark-CBNT-_yc.js";import"./Trash-CdE_28Ci.js";import"./HandShakeHeart-DwzG4i_Y.js";import"./Calendar-Le8lwLWI.js";import"./ThumbUp-Bnf09OAs.js";import"./Table-D1aYPWvO.js";import"./util-CJjk-0R0.js";import"./format-DbvlSUt5.js";import"./match-C0QkKNCv.js";import"./parseISO-IukRNK7-.js";import"./parse-BWBOIAJT.js";import"./getDefaultOptions-BP3X6oux.js";import"./util-B4sWpGcm.js";import"./kandidat.mock-DyEd4pVU.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-xdeT7c5-.js";import"./index-B0l3m9zt.js";import"./index-BQo3XAob.js";import"./index-CmbGJ2zo.js";import"./ChevronDown-CnFUOh5J.js";import"./Box-lF5ZNN4c.js";import"./Bell-tOlSG1Qh.js";import"./PersonChat-8V0d_TPr.js";import"./Eye-ChP6r2wD.js";import"./ProgressBar-D19DHIaY.js";import"./oppdaterStilling-BS1c5pLC.js";import"./EyeSlash-CTZA2_JR.js";import"./CircleSlash-D1wC9nJz.js";import"./Modal-G-5cvdDL.js";import"./floating-ui.react-BB9BoIX5.js";import"./Date.Input-DyqbiFvC.js";import"./useFormField-DJnSCjKQ.js";import"./useControllableState-BjNavWkk.js";import"./Modal.context-BVPj6e4T.js";import"./Checkbox-BTcjjQ-u.js";import"./Fieldset-NvYRI351.js";import"./Pencil-DKPVtbtf.js";import"./PersonbrukerTekst-3vnEro-J.js";import"./ClockDashed-BOQHzQJx.js";import"./Tasklist-BPwdRund.js";import"./ErrorBoundary-BushAIrX.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Pt as default};
