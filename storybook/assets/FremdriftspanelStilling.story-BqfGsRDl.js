import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-Bietwq5R.js";import{w as m,c as D}from"./ContextDecorators-icntH-04.js";import{F as N,A as v}from"./FullførtStilling-ByiIjgML.js";import{R as T}from"./GjenåpneStillingKnapp-CjnarepJ.js";import{T as A}from"./TilgangskontrollForInnhold-DWdWwcsX.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DjQZRqO2.js";import"./OrganisasjonsnummerAlert-DpQq6y7I.js";import"./VStack-sZt5JLr9.js";import"./BasePrimitive-C3DBZZoi.js";import"./List-lSNIRG4U.js";import"./Link-NJnPHS5k.js";import"./KandidatHendelseTag-cRMcFJwi.js";import"./Tag-5glEbiR4.js";import"./ChatExclamationmark-BDwWJbh4.js";import"./FileXMark-BgMiZV8k.js";import"./Trash-BLLOSfsT.js";import"./HandShakeHeart-BnQzUK6M.js";import"./Calendar-D6Qt28Ry.js";import"./ThumbUp-z-Bey4DB.js";import"./Table-Bui68sCT.js";import"./util-DDDrks3n.js";import"./format-CyfInD_Y.js";import"./match-DMb0w9XY.js";import"./parse-Ck-7mst5.js";import"./getDefaultOptions-BEP5j7QA.js";import"./parseISO-j5ExsMzG.js";import"./index-jK4pCKkV.js";import"./index-B40KJ5b4.js";import"./isBefore-BOXOTiO2.js";import"./util-pfPFjztK.js";import"./accordion-Bn5bkkhl.js";import"./index-BLw2VMv1.js";import"./index-CssnvCEQ.js";import"./index-BnQZUusD.js";import"./ChevronDown-BJ-qVGsw.js";import"./Box-BPmPSHsF.js";import"./Bell-B9zNlFqN.js";import"./PersonChat-DBkFk7TK.js";import"./Eye-Do7poDPo.js";import"./ProgressBar-CQI6ldq4.js";import"./EyeSlash-rCp5PtMg.js";import"./CircleSlash-BI-BdPjA.js";import"./Modal-BuFLIk4F.js";import"./floating-ui.react-Dg8nhyeA.js";import"./Date.Input-B_Qs2CQc.js";import"./useFormField-DufTyQGE.js";import"./useControllableState-B1O8h9rV.js";import"./Modal.context-DqcrTTpA.js";import"./Checkbox-DwCsMlYo.js";import"./Fieldset-TCl6OBUw.js";import"./Pencil-Ci5DsLc3.js";import"./PersonbrukerTekst-BR5P_mRB.js";import"./ClockDashed-C9FrKJXl.js";import"./Tasklist-CD-Z858Q.js";import"./ErrorBoundary-Cy_tbfcT.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Jt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
