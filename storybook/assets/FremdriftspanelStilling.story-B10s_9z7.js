import{h as I,j as t,aM as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-Dbv-ZY6m.js";import{w as m,c as D}from"./ContextDecorators-B5zeZMYj.js";import{K as b}from"./schema.zod-DwuT2yvg.js";import{u as _}from"./useKandidatlisteForEier-DezCsvb_.js";import{F as y,A as N}from"./FullførtStilling-iz0neOtr.js";import{R as T}from"./GjenåpneStillingKnapp-BnWLWvmU.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-CwIJDfym.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BfPHHPX5.js";import"./OrganisasjonsnummerAlert-CMN6RSC3.js";import"./VStack-DZNJyLn1.js";import"./BasePrimitive-ClHlo-1x.js";import"./List-Bh8CwDuZ.js";import"./Link-BnDDjZ4T.js";import"./KandidatHendelseTag-BtPcl_FJ.js";import"./Tag-Cqu0347d.js";import"./FileXMark-BOGsNA63.js";import"./Trash-Bf_kz-Y4.js";import"./HandShakeHeart-Cm8qLszF.js";import"./Calendar-Bu5eC4tK.js";import"./ThumbUp-D9H6k4pI.js";import"./Table-PASOvmf2.js";import"./util-BzjSVB_a.js";import"./format-Bjj9PWS-.js";import"./match-C0AC_sxS.js";import"./parseISO-C6AtVv5J.js";import"./parse-CoDqBx_5.js";import"./getDefaultOptions-BEMMC4OI.js";import"./util-zb_msfsb.js";import"./kandidat.mock-B9kzIrMD.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-rUW1fLf6.js";import"./index-BXcHl7f5.js";import"./index-CfwZtlMl.js";import"./index-Bts0Izyh.js";import"./ChevronDown-BT8bNVDr.js";import"./Box-BukE00JN.js";import"./Bell-DiPTVLtr.js";import"./PersonChat-BpE9bybZ.js";import"./Eye-P0k9Nnex.js";import"./ProgressBar-NMdcvun-.js";import"./oppdaterStilling-BPvjNvNp.js";import"./EyeSlash-BYKEdIws.js";import"./CircleSlash-BN6avT7o.js";import"./Modal-DWr6i92s.js";import"./floating-ui.react-HGTfdzo0.js";import"./Date.Input-BAQUwUKS.js";import"./useFormField-B25Nx7HO.js";import"./useControllableState-CuovWR7y.js";import"./Modal.context-AsKyuXOL.js";import"./Checkbox-CtOL91e4.js";import"./Fieldset-BJixV2_1.js";import"./Pencil-lvORBKmP.js";import"./PersonbrukerTekst-CUjmy3jX.js";import"./ClockDashed-DRfrabwa.js";import"./Tasklist-Bak44ZG3.js";import"./ErrorBoundary-BIul0pBv.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ot as default};
