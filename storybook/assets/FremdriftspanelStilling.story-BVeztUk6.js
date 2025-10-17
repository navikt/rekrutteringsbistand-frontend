import{ac as I,ad as w,j as t,R as k,S as x,ch as j,cl as b,aG as g,ci as u,aP as y,cx as _}from"./iframe-DLVjCQ2l.js";import{w as d,c as D}from"./ContextDecorators-Dnm-aOQQ.js";import{F as N,A as v}from"./FullførtStilling-k8pUwD--.js";import{R as T}from"./GjenåpneStillingKnapp-f_I7bQOJ.js";import{T as A}from"./TilgangskontrollForInnhold-B270wGEl.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DnXuv4rM.js";import"./OrganisasjonsnummerAlert-BASCv5nu.js";import"./VStack-CNzO53zi.js";import"./BasePrimitive-BHJDX4VK.js";import"./List-C4H0QhkM.js";import"./Link-kSfnfcMU.js";import"./KandidatHendelseTag-BSpIpDkA.js";import"./Tag-DE4yt_GY.js";import"./ChatExclamationmark-DfslM3z_.js";import"./FileXMark-DjJMDplT.js";import"./Trash-CeTBXU1c.js";import"./HandShakeHeart-B70TXLGs.js";import"./Calendar-CxpES4B_.js";import"./ThumbUp-D81IWYru.js";import"./Table-D8hHIQY0.js";import"./util-DyTW6BQh.js";import"./format-Dns01ZrX.js";import"./match-DaillBAK.js";import"./parseISO-BHDmYAfo.js";import"./parse-BpBnstiW.js";import"./getDefaultOptions-BS2zLtv_.js";import"./util-BYGRzxdr.js";import"./accordion-DUUnt15X.js";import"./index-C7BbwCNr.js";import"./index-Cxhzn5QJ.js";import"./index-CdLk0ukQ.js";import"./ChevronDown-Hp8-5Hl6.js";import"./Box-DBUkHFjG.js";import"./Bell-Das0_UWl.js";import"./PersonChat-Bssn2Lwq.js";import"./Eye-DmkTK0EM.js";import"./ProgressBar-D_zFGo5F.js";import"./EyeSlash-CQ7wu6Yu.js";import"./CircleSlash-CkjJ7VnH.js";import"./Modal-C7Cm0TSj.js";import"./floating-ui.react-BHZzUIMA.js";import"./Date.Input-DLLgFSdx.js";import"./useFormField-DqW3jgUJ.js";import"./useControllableState-B7-O95gB.js";import"./Modal.context-DC7G_jSK.js";import"./Checkbox-CsGsHFRT.js";import"./Fieldset-Cq3Ebw_l.js";import"./Pencil-DZTXeZMB.js";import"./PersonbrukerTekst-BqeGLe7l.js";import"./ClockDashed-BNE1ukON.js";import"./Tasklist-BCM0z0Yt.js";import"./ErrorBoundary-DhD1DVb2.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[m],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
