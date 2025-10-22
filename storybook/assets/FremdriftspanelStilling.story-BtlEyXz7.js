import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-29wJf-MM.js";import{w as m,c as D}from"./ContextDecorators-BtUzP62y.js";import{F as N,A as v}from"./FullførtStilling-BbGxRbYl.js";import{R as T}from"./GjenåpneStillingKnapp-BYYzXR06.js";import{T as A}from"./TilgangskontrollForInnhold-DZ5N9WGX.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-nC5pSZqq.js";import"./OrganisasjonsnummerAlert-CZllZoGG.js";import"./VStack-BUqoGe0H.js";import"./BasePrimitive-kFQ7tb9Y.js";import"./List-CYAAEi6i.js";import"./Link-BLY7alrK.js";import"./KandidatHendelseTag-DczlWlqm.js";import"./Tag-ckTyjE5j.js";import"./ChatExclamationmark-BBSDZreT.js";import"./FileXMark-BMIrEZUw.js";import"./Trash-B0akXBne.js";import"./HandShakeHeart-7fyLqimj.js";import"./Calendar-CriLi_lr.js";import"./ThumbUp-BgcCqH17.js";import"./Table-D1B3P-cv.js";import"./util-O-1r3e4W.js";import"./format-C27PvbPf.js";import"./match-r1881k89.js";import"./parse-Be59gMbd.js";import"./getDefaultOptions-C1xSy5BF.js";import"./parseISO-CisWrXQ1.js";import"./util-DEtvZ1n6.js";import"./accordion-CG00AIZO.js";import"./index-BvFzkmfi.js";import"./index-DcUlW0Th.js";import"./index-Cqfg1O0t.js";import"./ChevronDown-BWOEzEec.js";import"./Box-abiIw1MW.js";import"./Bell-CGrcm_4K.js";import"./PersonChat-C_3zxiF2.js";import"./Eye-BnwZ1Jy3.js";import"./ProgressBar-Z47hVxss.js";import"./EyeSlash-CgE7hfPw.js";import"./CircleSlash-Cm8aalyb.js";import"./Modal-DLrHj0JG.js";import"./floating-ui.react-BolRxfy1.js";import"./Date.Input-Cv9sKJ7x.js";import"./useFormField-BfJqjwot.js";import"./useControllableState-CdW7uF-V.js";import"./Modal.context-Dcp_CmN3.js";import"./Checkbox-Ye2cL1h7.js";import"./Fieldset-DBhpRTNo.js";import"./Pencil-A8YB8MIS.js";import"./PersonbrukerTekst-C5Wciw70.js";import"./ClockDashed-qhO3nzQ8.js";import"./Tasklist-C54zxJpy.js";import"./ErrorBoundary-Cdy9f8fw.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
