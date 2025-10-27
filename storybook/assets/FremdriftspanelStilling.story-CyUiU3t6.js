import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-BSwZn_oI.js";import{w as m,c as D}from"./ContextDecorators-C5aXKbvP.js";import{F as N,A as v}from"./FullførtStilling-CFpgydAk.js";import{R as T}from"./GjenåpneStillingKnapp-Br7-IUZF.js";import{T as A}from"./TilgangskontrollForInnhold-BxpwE-Tl.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BNUAfmvW.js";import"./OrganisasjonsnummerAlert-BX9tvKHw.js";import"./VStack-DjzZBkhX.js";import"./BasePrimitive-BHNKyCsd.js";import"./List-BEq7auS2.js";import"./Link-Bc3orUJ0.js";import"./KandidatHendelseTag-DgRM8e0p.js";import"./Tag-Cw756h_9.js";import"./ChatExclamationmark-DdLASfwf.js";import"./FileXMark-BOzKKBtH.js";import"./Trash-CW-Q6bzY.js";import"./HandShakeHeart-U-my39BI.js";import"./Calendar-KWJUd-kV.js";import"./ThumbUp-pLB34usb.js";import"./Table-B1aSq06A.js";import"./util-CtiqTgPV.js";import"./format-SsUeQAMy.js";import"./match-BhHc5umL.js";import"./parse-D37x4GqW.js";import"./getDefaultOptions-BG9ekSfG.js";import"./parseISO-Ca4v66bK.js";import"./index-Cfe2iOPl.js";import"./index-B40KJ5b4.js";import"./isBefore-hLlpF2sg.js";import"./util-BeYfbDft.js";import"./accordion-BIt-1gN5.js";import"./index-CubMmXeD.js";import"./index-ByYeg4yh.js";import"./index-Ch8AzLto.js";import"./ChevronDown-6vB9t1a7.js";import"./Box-B7gf-dTG.js";import"./Bell-h2n3WryP.js";import"./PersonChat-B1v3ssB_.js";import"./Eye-CZ250j_c.js";import"./ProgressBar-Dpb6xUzs.js";import"./EyeSlash-GZvmNd2n.js";import"./CircleSlash-Di6yaJzZ.js";import"./Modal-BoPnIdHz.js";import"./floating-ui.react-D8E_nKxQ.js";import"./Date.Input-DXjE-B4l.js";import"./useFormField-dVjSKRbI.js";import"./useControllableState-DTLpBcL-.js";import"./Modal.context-ogyKFidp.js";import"./Checkbox-DNhFAyzM.js";import"./Fieldset-DRLIwud1.js";import"./Pencil-6U696XdE.js";import"./PersonbrukerTekst-COP5E6Pk.js";import"./ClockDashed-BvyPstQu.js";import"./Tasklist-9jg2MzZP.js";import"./ErrorBoundary-DfDmdNCm.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Jt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
