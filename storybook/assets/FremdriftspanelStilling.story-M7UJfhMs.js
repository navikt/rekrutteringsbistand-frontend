import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-DLRfPnIA.js";import{w as m,c as D}from"./ContextDecorators-DxAd68GT.js";import{F as N,A as v}from"./FullførtStilling-D7JYMgnh.js";import{R as T}from"./GjenåpneStillingKnapp-BiOlipt7.js";import{T as A}from"./TilgangskontrollForInnhold-D_dpwOQd.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DPOG-WgZ.js";import"./OrganisasjonsnummerAlert-CuQCpySo.js";import"./VStack-4LIPwqdy.js";import"./BasePrimitive-BEpTr0x7.js";import"./List-1JqX_zGN.js";import"./Link-DJOsYkHV.js";import"./KandidatHendelseTag-CSw9k2Pi.js";import"./Tag-Bex3rpKK.js";import"./ChatExclamationmark-BPzKqelu.js";import"./FileXMark-fy2i8p_8.js";import"./Trash-BWxxXeYN.js";import"./HandShakeHeart-DVN5OzbY.js";import"./Calendar-CDBQMsFO.js";import"./ThumbUp-CYIiqwTe.js";import"./Table-BamrKyXB.js";import"./util-AvlE4TX_.js";import"./format-BnHsCra-.js";import"./match-BAt8OPxC.js";import"./parse-DwFSpjbA.js";import"./getDefaultOptions-DJMDZ6IL.js";import"./parseISO-261MZjGk.js";import"./util-Cr9yaPzG.js";import"./accordion-60uQf3pQ.js";import"./index-BjrLcAin.js";import"./index-BPbVD-VL.js";import"./index-Daaju5ov.js";import"./ChevronDown-CsjiObvX.js";import"./Box-7fTGBR83.js";import"./Bell-BbtPcs0u.js";import"./PersonChat-Cgkdd208.js";import"./Eye-BZ-t8OYe.js";import"./ProgressBar-f-sSbeYc.js";import"./EyeSlash-Dg7OqqF2.js";import"./CircleSlash-DvoKq-zE.js";import"./Modal-dGxTQDz5.js";import"./floating-ui.react-BVVz65mv.js";import"./Date.Input-D2YxAgPX.js";import"./useFormField-DWyA6BM_.js";import"./useControllableState-BvFOz6dj.js";import"./Modal.context-DoUDg5BX.js";import"./Checkbox-_sLyNdYY.js";import"./Fieldset-Dxns-CWA.js";import"./Pencil-CRlHzljX.js";import"./PersonbrukerTekst--XC22J5T.js";import"./ClockDashed-CqakMe-C.js";import"./Tasklist-DGaMjk7P.js";import"./ErrorBoundary-C2kSpCSa.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
