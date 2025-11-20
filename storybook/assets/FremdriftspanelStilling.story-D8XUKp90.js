import{aL as w,Q as I,j as t,w as k,S as j,cz as x,cH as b,cG as g,cA as u,W as y,cW as _}from"./iframe-CVGSEgl3.js";import{w as m,c as D}from"./ContextDecorators-oXCIaxkF.js";import{F as N,A as v}from"./FullførtStilling-CVAyvNa4.js";import{R as T}from"./GjenåpneStillingKnapp-C7z5-qw8.js";import{T as A}from"./TilgangskontrollForInnhold-BE-cuH-x.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DGP14m25.js";import"./OrganisasjonsnummerAlert-By_MGEFT.js";import"./VStack-Dym5gTnm.js";import"./BasePrimitive-qBIaQhXL.js";import"./List-ldPUU4Yb.js";import"./Link-DG13Hunt.js";import"./KandidatHendelseTag-DvxgqWDM.js";import"./Tag-CnwkgZqI.js";import"./ChatExclamationmark-B6I2EWTS.js";import"./FileXMark-Ckhc_Rov.js";import"./Trash-Dy2qWfjh.js";import"./HandShakeHeart-B2bLNKjs.js";import"./Calendar-CKqAy1uR.js";import"./ThumbUp-m3bzFOVG.js";import"./Table-BbJnIJYg.js";import"./dato-DcuCWi-y.js";import"./parse-DHV0IMgP.js";import"./getDefaultOptions-3hA47L1T.js";import"./parseISO-DOUqVw6G.js";import"./index-Dy4IngqS.js";import"./index-B40KJ5b4.js";import"./util-D6FEs9xz.js";import"./DatoVelger-BxQPtU7h.js";import"./useDatepicker-DFq9vwhk.js";import"./useControllableState-BUYnv2tY.js";import"./Modal-BCv-lyEN.js";import"./floating-ui.react-DKbBaBlE.js";import"./Date.Input-B3ercdvB.js";import"./useFormField-Cz3FfKKV.js";import"./ChevronDown-BS9qd_7E.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-ghVn4P7G.js";import"./Modal.context-CBMF66yi.js";import"./Popover-dYJ49tYF.js";import"./DismissableLayer-BI4yZ3io.js";import"./startOfMonth-DTbbwXR3.js";import"./Select-Ct5xF99Y.js";import"./endOfMonth-CvoVuLQS.js";import"./ArrowLeft-Dkk_SWgV.js";import"./ArrowRight-DKYcD2wy.js";import"./isSameDay-CkXqT3uY.js";import"./Checkbox-cYgvbobM.js";import"./Fieldset-HE674leT.js";import"./accordion-7_SqJ_nG.js";import"./index-B-QU52sf.js";import"./index-C5Qa4PWy.js";import"./index-CUWk6THE.js";import"./Box-Cfjj_n3_.js";import"./Bell-B6N0VdYD.js";import"./PersonChat-OqsJnz7b.js";import"./Eye-CXMSkrMM.js";import"./ProgressBar-BQ36ozQC.js";import"./useLatestRef-CLpRPFlw.js";import"./EyeSlash-DyavsUGP.js";import"./CircleSlash-CuRXhhHx.js";import"./Pencil-Bkg82FXp.js";import"./PersonbrukerTekst-DWqBl0fY.js";import"./ClockDashed-Bh6Kt7_l.js";import"./Tasklist-DJseI7sb.js";import"./ErrorBoundary-CsjdV0fo.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Qt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Qt as default};
