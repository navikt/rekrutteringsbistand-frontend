import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cp as b,aG as g,cB as u,aP as y,cC as _}from"./iframe-BHAALu18.js";import{w as d,c as D}from"./ContextDecorators-wFKfjQxz.js";import{F as N,A as v}from"./FullførtStilling-tl-8lyNQ.js";import{R as T}from"./GjenåpneStillingKnapp-N1OGdi-S.js";import{T as A}from"./TilgangskontrollForInnhold-EThv_fz2.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BfN5An09.js";import"./OrganisasjonsnummerAlert-BHvMlvj7.js";import"./VStack-Cq88-JDT.js";import"./BasePrimitive-DTksipQc.js";import"./List-BaN9HM07.js";import"./Link-H1I1_-EK.js";import"./KandidatHendelseTag-B4LO3XvZ.js";import"./Tag-CjIXk9UC.js";import"./FileXMark-CMmv0rBH.js";import"./Trash-TgRDHxl5.js";import"./HandShakeHeart-RWCGHmFB.js";import"./Calendar-Dxp2Sh-4.js";import"./ThumbUp-Bhk68IRC.js";import"./Table-nIodCrv-.js";import"./util-CtYvtQR3.js";import"./format-CcnEZL49.js";import"./match-UbcUMXBF.js";import"./parseISO-DhIi_C9M.js";import"./parse-Qbbomewj.js";import"./getDefaultOptions-CJC3hBp3.js";import"./util-BwpY6r-m.js";import"./accordion-D5SGkOuI.js";import"./index-BexvSsqS.js";import"./index-B6n22Hdp.js";import"./index-BUGA3vpB.js";import"./ChevronDown-6zNJcWbQ.js";import"./Box-Co0ZHhwe.js";import"./Bell-CLCx68LO.js";import"./PersonChat-CXg5zhHj.js";import"./Eye-CHbeNtvd.js";import"./ProgressBar-C7BE_leq.js";import"./EyeSlash-Bsk8en-a.js";import"./CircleSlash-BPcvjFsP.js";import"./Modal-CsKfTbyc.js";import"./floating-ui.react-BlUAEfg5.js";import"./Date.Input-BS8RN3Cy.js";import"./useFormField-D8u6Al33.js";import"./useControllableState-DvMFbOQQ.js";import"./Modal.context-CPyqR72d.js";import"./Checkbox-B8OnNWEK.js";import"./Fieldset-BvZsy4Lp.js";import"./Pencil-DjYoCGAn.js";import"./PersonbrukerTekst-CPrSBMC8.js";import"./ClockDashed-CuoVsCMO.js";import"./Tasklist-42km8e_2.js";import"./ErrorBoundary-DUp0eyiH.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
