import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cp as b,aG as g,cB as u,aP as y,cC as _}from"./iframe-DMAO4dCV.js";import{w as d,c as D}from"./ContextDecorators-fr5D2H3g.js";import{F as N,A as v}from"./FullførtStilling-3A8QwhS2.js";import{R as T}from"./GjenåpneStillingKnapp-CsyGx8MK.js";import{T as A}from"./TilgangskontrollForInnhold-SDD_nnR1.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BA-skGqf.js";import"./OrganisasjonsnummerAlert-U4B-14BE.js";import"./VStack-H9H7uo4P.js";import"./BasePrimitive-DltdQK2v.js";import"./List-BO7tnBXi.js";import"./Link-C39Zqzcy.js";import"./KandidatHendelseTag-Cm0RTCOk.js";import"./Tag-CcXbwr3R.js";import"./FileXMark-CLJG14O_.js";import"./Trash-Ddpoy2cR.js";import"./HandShakeHeart-CLjzX3wp.js";import"./Calendar-0C-iFPZG.js";import"./ThumbUp-BLrpvnA0.js";import"./Table-DWlcU3_K.js";import"./util-D2HT7faN.js";import"./format-Di_xz1fb.js";import"./match-DZ2KMeUt.js";import"./parseISO-CN9Jj-x8.js";import"./parse-DsJXUTpL.js";import"./getDefaultOptions-BGLmWrnM.js";import"./util-C9-WZX9t.js";import"./accordion-BIAJ7Fq5.js";import"./index-C2iQsAWY.js";import"./index-CifKVi8F.js";import"./index-C-Bi7_-g.js";import"./ChevronDown-Bb--lgvd.js";import"./Box-BZ2aXjD6.js";import"./Bell-BpQDzSnK.js";import"./PersonChat-BcO5wruc.js";import"./Eye-C9GNR91Q.js";import"./ProgressBar-DniCD24m.js";import"./EyeSlash-CeJzw7Hx.js";import"./CircleSlash-B3Pnylje.js";import"./Modal-DZZtdmg_.js";import"./floating-ui.react-BKlIVUh1.js";import"./Date.Input-DNo-mnrh.js";import"./useFormField-CjA7lB9L.js";import"./useControllableState-Cbu2ku7v.js";import"./Modal.context-B7_Jj5qA.js";import"./Checkbox-Ba3RKdO4.js";import"./Fieldset-lvKk3WyB.js";import"./Pencil-DIpFKCLK.js";import"./PersonbrukerTekst-Bv1vMReV.js";import"./ClockDashed-CslZY4Cm.js";import"./Tasklist-FRrPWjuv.js";import"./ErrorBoundary-CaMI_DEH.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
