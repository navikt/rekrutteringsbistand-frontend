import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cr as b,aG as g,co as u,aP as y,cD as _}from"./iframe-BfAWemmc.js";import{w as d,c as A}from"./ContextDecorators-5ZTJWDL7.js";import{F as N,A as v}from"./FullførtStilling-_1JgbWZZ.js";import{R as T}from"./GjenåpneStillingKnapp-Si-ZC92W.js";import{T as D}from"./TilgangskontrollForInnhold-YCos24kM.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CZJinPC_.js";import"./OrganisasjonsnummerAlert-CKNMwV2M.js";import"./VStack-E2AkkOI-.js";import"./BasePrimitive-4Bt1Qine.js";import"./List-CdDpv4YP.js";import"./Link-A-VeEQkm.js";import"./KandidatHendelseTag-COFRiu6Y.js";import"./Tag-BBcODoZp.js";import"./FileXMark-Cs2HeL1G.js";import"./Trash-lyimBUCL.js";import"./HandShakeHeart-BfGlbeYf.js";import"./Calendar-DLBjDSR0.js";import"./ThumbUp-BFmFnThU.js";import"./Table-C32uQCgO.js";import"./util-Cl7DppeK.js";import"./format-T6eo1b8A.js";import"./match-C_qGV_hU.js";import"./parseISO-NZvD22OB.js";import"./parse-B4iPNoV8.js";import"./getDefaultOptions-D1iwA5_5.js";import"./util-BF-xeARd.js";import"./accordion-BducnrIj.js";import"./index-DaeNAOh7.js";import"./index-Cs91MtzB.js";import"./index-2srZdlzg.js";import"./ChevronDown-BkwjVMbn.js";import"./Box-ag3FqX8H.js";import"./Bell-0B17DUdm.js";import"./PersonChat-WlWjQDfP.js";import"./Eye-DtxkFBJq.js";import"./ProgressBar-BrU8WO20.js";import"./EyeSlash-B7OVBIM4.js";import"./CircleSlash-DBqKmmWO.js";import"./Modal-BDH81RtI.js";import"./floating-ui.react-DNWRPkoZ.js";import"./Date.Input-wd6poww_.js";import"./useFormField-Ckq-4NQw.js";import"./useControllableState-DoW-j5pQ.js";import"./Modal.context-BsYtDPHn.js";import"./Checkbox-CjmWTY39.js";import"./Fieldset-Dxj5G_Hc.js";import"./Pencil-kBHDTqRZ.js";import"./PersonbrukerTekst-COv1Ht9i.js";import"./ClockDashed-DdLzaY1A.js";import"./Tasklist-C-n-UbaW.js";import"./ErrorBoundary-oP8m2KEm.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
