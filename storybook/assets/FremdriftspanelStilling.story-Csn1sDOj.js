import{aL as I,Q as w,j as t,w as k,S as j,cA as x,cI as b,cH as g,cB as u,W as y,cX as _}from"./iframe-DpIzbEh6.js";import{w as m,c as D}from"./ContextDecorators-Ca23vY5M.js";import{F as N,A as v}from"./FullførtStilling-CLN9stAW.js";import{R as T}from"./GjenåpneStillingKnapp-BK8-QPLG.js";import{T as A}from"./TilgangskontrollForInnhold-Bh38f3ID.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D8PB7bOg.js";import"./OrganisasjonsnummerAlert-DU6iBeu8.js";import"./VStack-DV-mKUsK.js";import"./BasePrimitive-CUveWDyh.js";import"./List-CjujHgjZ.js";import"./Link-Ckl8RwAe.js";import"./KandidatHendelseTag-DNdKryDm.js";import"./Tag-DoFMj22c.js";import"./ChatExclamationmark-DRIiMgdo.js";import"./FileXMark-YbK2oGrq.js";import"./Trash-ejeNRuoy.js";import"./HandShakeHeart-DoUmunwQ.js";import"./Calendar-yrgqPStg.js";import"./ThumbUp-NzJa49rm.js";import"./Table-D3jDpAO4.js";import"./dato-LgoA4Xw4.js";import"./parse-RftGy9Bo.js";import"./getDefaultOptions-wfwqw35y.js";import"./parseISO-3EvW_LXM.js";import"./index-CxfxYm7_.js";import"./index-B40KJ5b4.js";import"./util-Ds2nhTK-.js";import"./DatoVelger-CLUexYaq.js";import"./useDatepicker-BuO3DO0u.js";import"./useControllableState-DSjvWJiE.js";import"./Modal-CzC-BiWi.js";import"./floating-ui.react-BeyQwPMw.js";import"./Date.Input-C0FLtTG3.js";import"./useFormField-Dj651Pd3.js";import"./ChevronDown-Be61l9Us.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BEllSSZA.js";import"./Modal.context-BiOdcH09.js";import"./Popover-Dy0tH-3T.js";import"./DismissableLayer-D8ZhvvRv.js";import"./startOfMonth-DcPEsqcM.js";import"./Select-Bb40Eegf.js";import"./endOfMonth-CLHGYNBz.js";import"./ArrowLeft-D1XFGIg_.js";import"./ArrowRight-BhYd3EdR.js";import"./isSameDay-C85cNnG1.js";import"./Checkbox-DWCNhe_h.js";import"./Fieldset-D-5ZNLlD.js";import"./accordion-CIQIOmGL.js";import"./index-DnlndZd8.js";import"./index-Da5PKF-9.js";import"./index-DeQY4xrJ.js";import"./Box-Dhig9xP6.js";import"./Bell-CNcuu6HL.js";import"./PersonChat-C5arw4SP.js";import"./Eye-CpPfeSn9.js";import"./ProgressBar-rPMOiZAW.js";import"./useLatestRef-DZfpDuBf.js";import"./EyeSlash-CU2cTnta.js";import"./CircleSlash-CGcw3HZ_.js";import"./Pencil-BabqsJvH.js";import"./FullførStillingModal-BQHZqbgu.js";import"./PersonbrukerTekst-op6S_bKg.js";import"./ClockDashed-DbpLJJMQ.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-nq9Qu4H3.js";import"./ErrorBoundary-DhJF07Ds.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Yt as default};
